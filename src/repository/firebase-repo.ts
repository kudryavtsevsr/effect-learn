import {Repo} from './repo';
import {TermItem} from '../models/Term';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;

export type FirebaseKey = string;

export interface FirebaseTermsRawResponse {
  [key: FirebaseKey]: {
    id: string,
    term: string,
    definition: string
  }
}

export class FirebaseRepo implements Repo {
  async getTermsList(): Promise<TermItem[]> {
    try {
      const { data } = await axios.get<FirebaseTermsRawResponse>(`${baseUrl}/terms.json`);
      if (!data) {
        return [];
      }
      const payload = Object.keys(data).map(key => {
        return {
          ...data[key]
        }
      }).reverse();
      return payload as TermItem[];
    } catch (e) {
      throw new Error(`getTermsList error: ${e}`);
    }
  }

  async addTermToList(term: TermItem): Promise<TermItem[]> {
    try {
      const { data } = await axios.post(`${baseUrl}/terms.json`,term);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`addTermToList error: ${e}`);
    }
  }

  async editTerm(term: TermItem): Promise<TermItem[]> {
    try {
      const { data } = await axios.patch(`${baseUrl}/terms/${term.externalId}.json`,term);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`editTerm error: ${e}`);
    }
  }

  async removeTerm(term: TermItem): Promise<TermItem[]> {
    try {
      const { data } = await axios.delete(`${baseUrl}/terms/${term.externalId}.json`);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`removeTerm error: ${e}`);
    }
  }
}
