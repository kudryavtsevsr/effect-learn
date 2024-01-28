import {TermItem} from '../models/Term';

export interface Repo {
  getTermsList(): Promise<TermItem[]>
  addTermToList(term: TermItem): Promise<TermItem[]>
  editTerm(term: TermItem): Promise<TermItem[]>
  removeTerm(term: TermItem): Promise<TermItem[]>
}
