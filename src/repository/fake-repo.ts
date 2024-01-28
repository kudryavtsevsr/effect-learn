import {Repo} from './repo';
import {termsList} from './fixtures/terms-list-mock';
import {TermItem} from '../models/Term';

const fakeRepoDelay = parseInt(process.env.REACT_APP_FAKE_REPO_DELAY || '2000');

export class FakeRepo implements Repo {
  getTermsList(): Promise<TermItem[]> {
    return new Promise(resolve => setTimeout(() => resolve(termsList.map(termItem => {
      return {
        ...termItem,
        externalId: ''
      };
    })), fakeRepoDelay));
  }

  addTermToList(term: TermItem): Promise<TermItem[]> {
    return new Promise(resolve => setTimeout(() => resolve(termsList.map(termItem => {
      return {
        ...termItem,
        externalId: ''
      };
    })), fakeRepoDelay));
  }

  editTerm(term: TermItem): Promise<TermItem[]> {
    return new Promise(resolve => setTimeout(() => resolve(termsList.map(termItem => {
      return {
        ...termItem,
        externalId: ''
      };
    })), fakeRepoDelay));
  }

  removeTerm(term: TermItem): Promise<TermItem[]> {
    return new Promise(resolve => setTimeout(() => resolve(termsList.map(termItem => {
      return {
        ...termItem,
        externalId: ''
      };
    })), fakeRepoDelay));
  }
}
