import {repoActionKind, RepoActionKindValues} from '../action-kinds';
import {TermItem} from '../../models/Term';

const DEFAULT_KEY = 'DEFAULT';

const handlers: RepoHandlers = {
  [repoActionKind.getTermsList]: (state: RepoState, {currentTermsList}: Record<string, TermItem[]>): RepoState => ({...state, termsList: currentTermsList}),
  [repoActionKind.addTermToList]: (state: RepoState, {term}: Record<string, TermItem>): RepoState => ({...state, termsList: [term, ...state.termsList]}),
  [repoActionKind.editTermInList]: (state: RepoState, {term, id}: EditTermInListParams): RepoState => ({
    ...state,
    termsList: state.termsList.map((item) => item.id === id ? {...item, ...term} : item)
  }),
  [repoActionKind.removeTermFromList]: (state: RepoState, { id }: RemoveTermFromListParams): RepoState => ({
    ...state,
    termsList: state.termsList.filter(item => item.id !== id)
  }),
  [repoActionKind.showLoader]: (state: RepoState) => ({...state, isLoading: true}),
  [repoActionKind.hideLoader]: (state: RepoState) => ({...state, isLoading: false}),
  [DEFAULT_KEY]: (state: RepoState): RepoState => state
}

export const repoReducer: RepoReducer = (state: RepoState, action: ReducerAction): RepoState => {
  const handle: RepoHandle = handlers[action.type] || handlers[DEFAULT_KEY];
  return handle(state, action.payload);
}

export type RepoReducer = (state: RepoState, action: ReducerAction) => RepoState;

export interface RepoState {
  termsList: TermItem[],
  isLoading: boolean
}

type RepoHandle = (state: RepoState, payload?: any) => RepoState;

type RepoHandlers = { [P in RepoActionKindValues]: RepoHandle } & { [DEFAULT_KEY]: RepoHandle };

export interface ReducerAction {
  type: RepoActionKindValues,
  payload?: Record<string, unknown>
}

interface EditTermInListParams {
  term: Record<string, unknown>,
  id: string
}

interface RemoveTermFromListParams {
  id: string
}
