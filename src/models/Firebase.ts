export type FirebaseKey = string;

export interface FirebaseTermsRawResponse {
  [key: FirebaseKey]: {
    id: string,
    term: string,
    definition: string
  }
}
