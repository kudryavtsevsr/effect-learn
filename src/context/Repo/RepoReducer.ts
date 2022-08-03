import {RepoAction} from '../actions';
import {TermItem} from '../../repository/fixtures/terms-list-mock';

export interface RepoState {
  termsList: TermItem[],
  isLoading: boolean
}

interface editTermInListParams {
  term: Record<string, unknown>,
  id: string
}

const handlers: Record<string, unknown> = {
  [RepoAction.getTermsList]: (state: RepoState, {currentTermsList}: Record<string, unknown>): unknown => ({...state, termsList: currentTermsList}),
  [RepoAction.addTermToList]: (state: RepoState, {term}: Record<string, unknown>): unknown => ({...state, termsList: [term, ...state.termsList]}),
  [RepoAction.editTermInList]: (state: RepoState, {term, id}: editTermInListParams): unknown => ({
    ...state,
    termsList: state.termsList.map((item) => item.id === id ? {...item, ...term} : item)
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
