import {TermItem} from './fixtures/terms-list-mock';

export interface Repo {
  getTermsList(): Promise<TermItem[]>
}
