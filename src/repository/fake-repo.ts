import {Repo} from './repo';
import {TermItem, termsList} from './fixtures/terms-list-mock';

const fakeRepoDelay = parseInt(process.env.FAKE_REPO_DELAY || '2000');

export class FakeRepo implements Repo {
  getTermsList(): Promise<TermItem[]> {
    return new Promise(resolve => setTimeout(() => resolve(termsList), fakeRepoDelay));
  }
}
