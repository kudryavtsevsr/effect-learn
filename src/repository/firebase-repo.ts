import {Repo} from './repo';
import {TermItem} from './fixtures/terms-list-mock';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;

export type FirebaseTermsRawResponse = {
  [key: string]: {
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

  async editTerm(term: Omit<TermItem, "id">, id: string): Promise<TermItem[]> {
    try {
      const { data } = await axios.patch(`${baseUrl}/terms/${id}.json`,term);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`editTerm error: ${e}`);
    }
  }

  async removeTerm(id: string): Promise<TermItem[]> {
    try {
      const { data } = await axios.delete(`${baseUrl}/terms/${id}.json`);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`removeTerm error: ${e}`);
    }
  }
}
