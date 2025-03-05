import { indexedDBAPI } from '../api/indexedDBAPI';
import { db } from '../db/db';
import { TermItem } from '../../models/Term';
import { configureStore } from '@reduxjs/toolkit';

// Mock the database
jest.mock('../db/db', () => ({
  db: {
    terms: {
      orderBy: jest.fn(),
      put: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    populateWithMockData: jest.fn(),
  },
}));

describe('indexedDBAPI', () => {
  const mockTerm: TermItem = {
    id: '123',
    term: 'Test Term',
    definition: 'Test Definition',
    externalId: '',
    order: 1,
  };

  const mockTermWithoutId: Omit<TermItem, 'externalId'> = {
    id: '123',
    term: 'Test Term',
    definition: 'Test Definition',
    order: 1,
  };

  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    store = configureStore({
      reducer: {
        [indexedDBAPI.reducerPath]: indexedDBAPI.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(indexedDBAPI.middleware),
    });
  });

  describe('fetchTerms', () => {
    it('should fetch terms successfully', async () => {
      const mockTerms = [mockTerm];
      const mockReverse = jest.fn().mockReturnValue({ toArray: () => Promise.resolve(mockTerms) });
      const mockOrderBy = jest.fn().mockReturnValue({ reverse: mockReverse });
      (db.terms.orderBy as jest.Mock).mockImplementation(() => ({
        reverse: mockReverse,
      }));
      (db.populateWithMockData as jest.Mock).mockResolvedValue(false);

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.fetchTerms.initiate(undefined));

      expect(result.data).toEqual(mockTerms);
      expect(db.terms.orderBy).toHaveBeenCalledWith('order');
    });

    it('should handle errors when fetching terms', async () => {
      (db.terms.orderBy as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.fetchTerms.initiate(undefined));

      expect(result.error).toBe('Failed to fetch terms from IndexedDB');
    });
  });

  describe('createTerms', () => {
    it('should create a term successfully', async () => {
      (db.terms.put as jest.Mock).mockResolvedValue(undefined);

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.createTerms.initiate(mockTermWithoutId));

      expect(result.data).toBeDefined();
      expect(db.terms.put).toHaveBeenCalled();
    });

    it('should handle errors when creating terms', async () => {
      (db.terms.put as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.createTerms.initiate(mockTermWithoutId));

      expect(result.error).toBe('Failed to create term in IndexedDB');
    });
  });

  describe('updateTerms', () => {
    it('should update a term successfully', async () => {
      (db.terms.update as jest.Mock).mockResolvedValue(undefined);

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.updateTerms.initiate(mockTerm));

      expect(result.data).toBeUndefined();
      expect(db.terms.update).toHaveBeenCalledWith(mockTerm.id, mockTerm);
    });

    it('should handle errors when updating terms', async () => {
      (db.terms.update as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.updateTerms.initiate(mockTerm));

      expect(result.error).toBe('Failed to update term in IndexedDB');
    });
  });

  describe('deleteTerms', () => {
    it('should delete a term successfully', async () => {
      (db.terms.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.deleteTerms.initiate(mockTerm));

      expect(result.data).toBeUndefined();
      expect(db.terms.delete).toHaveBeenCalledWith(mockTerm.id);
    });

    it('should handle errors when deleting terms', async () => {
      (db.terms.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await (store.dispatch as any)(indexedDBAPI.endpoints.deleteTerms.initiate(mockTerm));

      expect(result.error).toBe('Failed to delete term from IndexedDB');
    });
  });
}); 