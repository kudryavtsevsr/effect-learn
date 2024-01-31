import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TermItem} from '../../models/Term';
import {FirebaseKey, FirebaseTermsRawResponse} from '../../models/Firebase';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;
const useFakeRepo = process.env.REACT_APP_USE_FAKE_REPO;

let fakeTermsList: TermItem[] | null = null;

const TagType = {
  Terms: 'Terms'
};

export const termsAPI = createApi({
  reducerPath: 'termsAPI',
  baseQuery: fetchBaseQuery({baseUrl}),
  tagTypes: [TagType.Terms],
  endpoints: (build) => ({
    fetchTerms: build.query<TermItem[] | null, void>(
      useFakeRepo === 'true'
        ? {
          queryFn: async () => {
            const data = !!fakeTermsList ? {termsList: fakeTermsList} : await import('../../fixtures/terms-list-mock');
            fakeTermsList = data.termsList.map(termItem => {
              return {
                ...termItem,
                externalId: ''
              };
            });
            return {data: fakeTermsList};
          },
          providesTags: [TagType.Terms]
        }
        : {
          query: () => ({
            url: '/terms.json'
          }),
          transformResponse(response: FirebaseTermsRawResponse): TermItem[] {
            return Object.keys(response).map(key => {
              return {
                ...response[key],
                externalId: key
              };
            }).reverse();
          },
          providesTags: [TagType.Terms]
        }),
    createTerms: build.mutation<FirebaseKey, Omit<TermItem, 'externalId'>> (
      useFakeRepo === 'true'
        ? {
          queryFn: (termItem) => {
            fakeTermsList = [{...termItem, externalId: termItem.id}, ...fakeTermsList || []];
            return {data: ''};
          },
          invalidatesTags: [TagType.Terms]
        }
        : {
          query: (termItem) => {
            return {
              url: '/terms.json',
              method: 'POST',
              body: termItem
            };
          },
          invalidatesTags: [TagType.Terms]
        }
    ),
    updateTerms: build.mutation<TermItem, TermItem>(
      useFakeRepo === 'true'
        ? {
          queryFn: (termItem) => {
            fakeTermsList = !!fakeTermsList
              ? fakeTermsList.map((item) => item.id === termItem.id ? {...item, ...termItem} : item)
              : null;
            return {data: termItem};
          },
          invalidatesTags: [TagType.Terms]
        }
        : {
          query: (termItem) => ({
            url: `/terms/${termItem.externalId}.json`,
            method: 'PUT',
            body: termItem
          }),
          invalidatesTags: [TagType.Terms]
        }
    ),
    deleteTerms: build.mutation<undefined, TermItem>(
      useFakeRepo === 'true'
        ? {
          queryFn: (termItem) => {
            fakeTermsList = fakeTermsList?.filter(item => item.id !== termItem.id) || []
            return { data: undefined }
          },
          invalidatesTags: [TagType.Terms]
        }
        : {
          query: (termItem) => ({
              url: `/terms/${termItem.externalId}.json`,
              method: 'DELETE'
          }),
          invalidatesTags: [TagType.Terms]
        }
    ),
  })
});
