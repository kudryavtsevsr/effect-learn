import {TermItem} from './fixtures/terms-list-mock';

export interface Repo {
  getTermsList(): Promise<TermItem[]>
  addTermToList(term: TermItem): Promise<TermItem[]>
  editTerm(term: Omit<TermItem, "id">, id: string): Promise<TermItem[]>
  removeTerm(id: string): Promise<TermItem[]>
}
