import { TermsDatabase } from '../db/db';
import { termsList } from '../../fixtures/terms-list-mock';

// Mock Dexie
jest.mock('dexie', () => {
  class MockDexie {
    version: jest.Mock;
    stores: jest.Mock;
    table: jest.Mock;
    delete: jest.Mock;
    terms: any;

    constructor(name: string) {
      this.version = jest.fn().mockReturnThis();
      this.stores = jest.fn().mockReturnThis();
      this.table = jest.fn();
      this.delete = jest.fn().mockResolvedValue(undefined);
    }
  }
  return MockDexie;
});

// Mock the database initialization
jest.mock('../db/db', () => {
  const actual = jest.requireActual('../db/db');
  const mockDb = new actual.TermsDatabase();
  return {
    TermsDatabase: actual.TermsDatabase,
    db: mockDb
  };
});

describe('TermsDatabase', () => {
  let db: TermsDatabase;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create a new instance for each test
    db = new TermsDatabase();

    // Mock the terms table methods
    const count = jest.fn() as jest.MockedFunction<any>;
    const bulkPut = jest.fn() as jest.MockedFunction<any>;
    const orderBy = jest.fn() as jest.MockedFunction<any>;
    const deleteMethod = jest.fn() as jest.MockedFunction<any>;

    // Set up the terms property with mock methods
    Object.defineProperty(db, 'terms', {
      value: {
        count,
        bulkPut,
        orderBy,
        delete: deleteMethod
      },
      writable: true
    });
  });

  afterEach(async () => {
    await (db as any).delete();
  });

  describe('populateWithMockData', () => {
    it('should populate database with mock data when empty', async () => {
      (db.terms.count as jest.Mock).mockResolvedValue(0);
      (db.terms.bulkPut as jest.Mock).mockResolvedValue(undefined);

      const result = await db.populateWithMockData();

      expect(result).toBe(true);
      expect(db.terms.count).toHaveBeenCalled();
      expect(db.terms.bulkPut).toHaveBeenCalledWith(
        expect.arrayContaining(
          termsList.map(({ id, ...rest }) => ({
            ...rest,
            externalId: '',
            id: id.toString()
          }))
        )
      );
    });

    it('should not populate database when data exists', async () => {
      (db.terms.count as jest.Mock).mockResolvedValue(5);

      const result = await db.populateWithMockData();

      expect(result).toBe(false);
      expect(db.terms.count).toHaveBeenCalled();
      expect(db.terms.bulkPut).not.toHaveBeenCalled();
    });

    it('should handle errors during population', async () => {
      (db.terms.count as jest.Mock).mockResolvedValue(0);
      (db.terms.bulkPut as jest.Mock).mockRejectedValue(new Error('Database error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await db.populateWithMockData();

      expect(result).toBe(false);
      expect(db.terms.count).toHaveBeenCalled();
      expect(db.terms.bulkPut).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error populating mock data:', expect.any(Error));
    });
  });

  describe('getNextOrder', () => {
    it('should return order + 1 when terms exist', async () => {
      const mockTerm = { order: 5 };
      const firstSpy = jest.fn().mockResolvedValue(mockTerm);
      const reverseSpy = jest.fn().mockReturnValue({ first: firstSpy });
      (db.terms.orderBy as jest.Mock).mockReturnValue({ reverse: reverseSpy });

      const result = await db.getNextOrder();

      expect(result).toBe(6);
      expect(db.terms.orderBy).toHaveBeenCalledWith('order');
    });

    it('should return 1 when no terms exist', async () => {
      const firstSpy = jest.fn().mockResolvedValue(null);
      const reverseSpy = jest.fn().mockReturnValue({ first: firstSpy });
      (db.terms.orderBy as jest.Mock).mockReturnValue({ reverse: reverseSpy });

      const result = await db.getNextOrder();

      expect(result).toBe(1);
    });
  });
}); 