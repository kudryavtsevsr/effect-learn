import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {FirebaseTermsRawResponse} from '../../repository/firebase-repo';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;

export const termsAPI = createApi({
  reducerPath: 'termsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchTerms: build.query<TermItem[], void>({
      query: () => ({
        url: '/terms.json'
      }),
      transformResponse(response: FirebaseTermsRawResponse): TermItem[] {
        return Object.keys(response).map(key => {
          return {
            ...response[key],
            id: key
          }
        }).reverse();
      }
    })
  })
});
