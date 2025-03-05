import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { TermItem } from '../../models/Term';
import { db } from '../db/db';

const TagType = {
  Terms: 'Terms'
};

export const indexedDBAPI = createApi({
  reducerPath: 'termsAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: [TagType.Terms],
  endpoints: (build) => ({
    fetchTerms: build.query<TermItem[] | null, void>({
      async queryFn() {
        try {
          const populated = await db.populateWithMockData();
          if (populated) await new Promise(resolve => setTimeout(resolve, 1000));
          const terms = await db.terms.orderBy('order').reverse().toArray();
          return { data: terms };
        } catch (error) {
          return { error: 'Failed to fetch terms from IndexedDB' };
        }
      },
      providesTags: [TagType.Terms]
    }),
    createTerms: build.mutation<string, Omit<TermItem, 'externalId'>>({
      async queryFn(term) {
        try {
          const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const termToAdd = {
            ...term,
            id: uniqueId,
            externalId: ''
          };
          await db.terms.put(termToAdd);
          return { data: uniqueId };
        } catch (error) {
          console.error('Failed to create term in IndexedDB:', error);
          return { error: 'Failed to create term in IndexedDB' };
        }
      },
      invalidatesTags: [TagType.Terms]
    }),
    updateTerms: build.mutation<void, TermItem>({
      async queryFn(term) {
        try {
          await db.terms.update(term.id, term);
          return { data: undefined };
        } catch (error) {
          return { error: 'Failed to update term in IndexedDB' };
        }
      },
      invalidatesTags: [TagType.Terms]
    }),
    deleteTerms: build.mutation<void, TermItem>({
      async queryFn(term) {
        try {
          await db.terms.delete(term.id);
          return { data: undefined };
        } catch (error) {
          return { error: 'Failed to delete term from IndexedDB' };
        }
      },
      invalidatesTags: [TagType.Terms]
    })
  })
}); 