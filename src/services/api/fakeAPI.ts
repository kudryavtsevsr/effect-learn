import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { TermItem } from '../../models/Term';
import { FirebaseKey } from '../../models/Firebase';

let fakeTermsList: TermItem[] | null = null;
let nextOrder = 1;

const TagType = {
  Terms: 'Terms'
};

export const fakeAPI = createApi({
  reducerPath: 'termsAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: [TagType.Terms],
  endpoints: (build) => ({
    fetchTerms: build.query<TermItem[] | null, void>({
      async queryFn() {
        if (!fakeTermsList) {
          const data = await import('../../fixtures/terms-list-mock');
          fakeTermsList = data.termsList.map(termItem => ({
            ...termItem,
            externalId: ''
          }));
          nextOrder = Math.max(...fakeTermsList.map(term => term.order)) + 1;
        }
        return { data: fakeTermsList };
      },
      providesTags: [TagType.Terms]
    }),
    createTerms: build.mutation<FirebaseKey, Omit<TermItem, 'externalId'>>({
      queryFn: (termItem) => {
        const newTerm: TermItem = {
          ...termItem,
          externalId: termItem.id,
          order: nextOrder++
        };
        fakeTermsList = [newTerm, ...(fakeTermsList || [])];
        return { data: '' };
      },
      invalidatesTags: [TagType.Terms]
    }),
    updateTerms: build.mutation<TermItem, TermItem>({
      queryFn: (termItem) => {
        if (fakeTermsList) {
          const existingTerm = fakeTermsList.find(item => item.id === termItem.id);
          if (existingTerm) {
            fakeTermsList = fakeTermsList.map(item => 
              item.id === termItem.id 
                ? { ...termItem, order: existingTerm.order }
                : item
            );
          }
        }
        return { data: termItem };
      },
      invalidatesTags: [TagType.Terms]
    }),
    deleteTerms: build.mutation<undefined, TermItem>({
      queryFn: (termItem) => {
        fakeTermsList = fakeTermsList?.filter(item => item.id !== termItem.id) || [];
        return { data: undefined };
      },
      invalidatesTags: [TagType.Terms]
    })
  })
}); 