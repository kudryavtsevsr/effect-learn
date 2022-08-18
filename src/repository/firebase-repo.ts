import {Repo} from './repo';
import {TermItem, termsList} from './fixtures/terms-list-mock';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_FIREBASE_URL;

export class FirebaseRepo implements Repo {
  async getTermsList(): Promise<TermItem[]> {
    try {
      const { data } = await axios.get(`${baseUrl}/terms.json`);
      console.log('getTermsList', data);
      if (!data) {
        return [];
      }
      const payload = Object.keys(data).map(key => {
        return {
          ...data[key],
          id: key
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
      console.log('addTermToList', data);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`addTermToList error: ${e}`);
    }
  }

  async editTerm(term: Omit<TermItem, "id">, id: string): Promise<TermItem[]> {
    try {
      const { data } = await axios.patch(`${baseUrl}/terms/${id}.json`,term);
      console.log('editTerm', data);
      return data as TermItem[];
    } catch (e) {
      throw new Error(`addTermToList error: ${e}`);
    }
  }
}