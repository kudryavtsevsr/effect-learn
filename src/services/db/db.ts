import Dexie, { Table } from 'dexie';
import { TermItem } from '../../models/Term';
import { termsList } from '../../fixtures/terms-list-mock';

export class TermsDatabase extends Dexie {
  terms!: Table<TermItem>;

  constructor() {
    super('TermsDatabase');
    this.version(1).stores({
      terms: 'id, term, definition, externalId, order'
    });
  }

  async populateWithMockData() {
    const count = await this.terms.count();
    if (count === 0) {
      const termsToAdd = termsList.map(({ id, ...rest }) => ({
        ...rest,
        externalId: '',
        id: id.toString()
      }));
      try {
        await this.terms.bulkPut(termsToAdd);
        return true;
      } catch (error) {
        console.error('Error populating mock data:', error);
        return false;
      }
    }
    return false;
  }

  async getNextOrder(): Promise<number> {
    const highestOrder = await this.terms.orderBy('order').reverse().first();
    return highestOrder ? highestOrder.order + 1 : 1;
  }
}

export const db = new TermsDatabase();

db.populateWithMockData().catch(err => {
  console.error('Failed to populate database:', err);
}); 
