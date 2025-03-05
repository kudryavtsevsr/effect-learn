import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TermItem } from '../../models/Term';
import { FirebaseKey, FirebaseTermsRawResponse } from '../../models/Firebase';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;

const TagType = {
  Terms: 'Terms'
};

export const firebaseAPI = createApi({
  reducerPath: 'termsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [TagType.Terms],
  endpoints: (build) => ({
    fetchTerms: build.query<TermItem[] | null, void>({
      query: () => ({
        url: '/terms.json'
      }),
      transformResponse(response: FirebaseTermsRawResponse): TermItem[] {
        return Object.keys(response).map(key => {
          return {
            ...response[key],
            externalId: key,
            order: Date.now() + parseInt(key, 36)
          };
        }).reverse();
      },
      providesTags: [TagType.Terms]
    }),
    createTerms: build.mutation<FirebaseKey, Omit<TermItem, 'externalId'>>({
      query: (termItem) => ({
        url: '/terms.json',
        method: 'POST',
        body: termItem
      }),
      invalidatesTags: [TagType.Terms]
    }),
    updateTerms: build.mutation<TermItem, TermItem>({
      query: (termItem) => ({
        url: `/terms/${termItem.externalId}.json`,
        method: 'PUT',
        body: termItem
      }),
      invalidatesTags: [TagType.Terms]
    }),
    deleteTerms: build.mutation<undefined, TermItem>({
      query: (termItem) => ({
        url: `/terms/${termItem.externalId}.json`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagType.Terms]
    })
  })
}); 