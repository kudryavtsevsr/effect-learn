import {RepoAction} from '../actions';
import {TermItem} from '../../repository/fixtures/terms-list-mock';

const handlers: Record<string, unknown> = {
  [RepoAction.getTermsList]: (state: RepoState, {currentTermsList}: Record<string, unknown>): unknown => ({...state, termsList: currentTermsList}),
  [RepoAction.addTermToList]: (state: RepoState, {term}: Record<string, unknown>): unknown => ({...state, termsList: [term, ...state.termsList]}),
  [RepoAction.editTermInList]: (state: RepoState, {term, id}: EditTermInListParams): unknown => ({
    ...state,
    termsList: state.termsList.map((item) => item.id === id ? {...item, ...term} : item)
  }),
  [RepoAction.removeTermFromList]: (state: RepoState, { id }: RemoveTermFromListParams): unknown => ({
    ...state,
    termsList: state.termsList.filter(item => item.id !== id)
  }),
  [RepoAction.showLoader]: (state: RepoState) => ({...state, isLoading: true}),
  [RepoAction.hideLoader]: (state: RepoState) => ({...state, isLoading: false}),
  DEFAULT: (state: unknown): unknown => state
}

export const repoReducer = (state: RepoState, action: Record<string, string>) => {
  // @ts-ignore
  const handle: (state: unknown, action?: Record<string, string>) => unknown = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}

export interface RepoState {
  termsList: TermItem[],
  isLoading: boolean
}

interface EditTermInListParams {
  term: Record<string, unknown>,
  id: string
}

interface RemoveTermFromListParams {
  id: string
}
