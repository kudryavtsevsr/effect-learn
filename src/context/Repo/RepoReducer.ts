import {RepoAction} from '../actions';
import {TermItem} from '../../repository/fixtures/terms-list-mock';

export interface RepoState {
  termsList: TermItem[]
}

const handlers: Record<string, unknown> = {
  [RepoAction.getTermsList]: (state: unknown, {currentTermsList}: Record<string, unknown>): unknown => ({termsList: currentTermsList}),
  [RepoAction.addTermToList]: (state: RepoState, {term}: Record<string, unknown>): unknown => ({termsList: [term, ...state.termsList]}),
  [RepoAction.editTermInList]: (state: RepoState, {term, index}: Record<string, unknown>): unknown => ({
    termsList: state.termsList.map((item, itemIndex) => itemIndex === index ? term : item)
  }),
  DEFAULT: (state: unknown): unknown => state
}

export const repoReducer = (state: RepoState, action: Record<string, string>) => {
  // @ts-ignore
  const handle: (state: unknown, action?: Record<string, string>) => unknown = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}
