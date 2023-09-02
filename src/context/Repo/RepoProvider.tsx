import React, {ReactNode, useReducer} from 'react';
import {FakeRepo} from '../../repository/fake-repo';
import {RepoContext} from './RepoContext';
import {repoReducer} from './RepoReducer';
import {repoActionKind} from '../action-kinds';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {FirebaseRepo} from '../../repository/firebase-repo';

interface Props {
  children?: ReactNode;
}

export interface RepoContextType {
  fetchTermsList: () => Promise<void>,
  addTermToList: (term: TermItem) => Promise<void>,
  editTermInList: (term: Omit<TermItem, 'id'>, id: string) => Promise<void>,
  removeTermFromList: (id: string) => Promise<void>,
  termsList: TermItem[],
  showLoader: () => void,
  hideLoader: () => void,
  isLoading: boolean
}

const useFakeRepo = process.env.REACT_APP_USE_FAKE_REPO;

export const RepoProvider = ({children}: Props) => {
  const [{termsList, isLoading}, dispatch] = useReducer<typeof repoReducer>(repoReducer, {
    termsList: [],
    isLoading: false
  });

  const repository = useFakeRepo === 'true' ? new FakeRepo() : new FirebaseRepo();

  async function fetchTermsList(): Promise<void> {
    const currentTermsList = await repository.getTermsList();
    dispatch({type: repoActionKind.getTermsList, payload: {currentTermsList}});
  }

  async function addTermToList(term: TermItem): Promise<void> {
    dispatch({type: repoActionKind.addTermToList, payload: {term}});
    await repository.addTermToList(term);
  }

  async function editTermInList(term: Omit<TermItem, 'id'>, id: string): Promise<void> {
    dispatch({type: repoActionKind.editTermInList, payload: {term, id}});
    await repository.editTerm(term, id);
  }

  async function removeTermFromList(id: string): Promise<void> {
    dispatch({type: repoActionKind.removeTermFromList, payload: {id}});
    await repository.removeTerm(id);
  }

  function showLoader() {
    dispatch({type: repoActionKind.showLoader});
  }

  function hideLoader() {
    dispatch({type: repoActionKind.hideLoader});
  }

  return (
    <RepoContext.Provider value={{
      fetchTermsList,
      addTermToList,
      editTermInList,
      removeTermFromList,
      termsList,
      showLoader,
      hideLoader,
      isLoading
    }}>
      {children}
    </RepoContext.Provider>
  );
};
