import React, {ReactNode, useReducer} from 'react';
import {FakeRepo} from '../../repository/fake-repo';
import { RepoContext } from './RepoContext';
import {repoReducer} from './RepoReducer';
import {RepoAction} from '../actions';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {FirebaseRepo} from '../../repository/firebase-repo';

interface Props {
  children?: ReactNode
}

export interface RepoContextType {
  fetchTermsList: () => Promise<void>,
  addTermToList: (term: TermItem) => Promise<void>,
  editTermInList: (term: Omit<TermItem, "id">, id: string) => Promise<void>,
  removeTermFromList: (id: string) => Promise<void>,
  termsList: TermItem[],
  showLoader: () => void,
  hideLoader: () => void,
  isLoading: boolean
}

const useFakeRepo = process.env.REACT_APP_USE_FAKE_REPO;

export const RepoProvider = ({children}: Props) => {
  // @ts-ignore
  const [{termsList, isLoading}, dispatch] = useReducer(repoReducer, {termsList: [], isLoading: false});

  const repository = useFakeRepo === 'true' ? new FakeRepo() : new FirebaseRepo();

  async function fetchTermsList(): Promise<void> {
    const currentTermsList = await repository.getTermsList();
    // @ts-ignore
    dispatch({type: RepoAction.getTermsList, currentTermsList});
  }

  async function addTermToList(term: TermItem): Promise<void> {
    // @ts-ignore
    dispatch({type: RepoAction.addTermToList, term});
    await repository.addTermToList(term);
  }

  async function editTermInList(term: Omit<TermItem, "id">, id: string): Promise<void> {
    // @ts-ignore
    dispatch({type: RepoAction.editTermInList, term, id});
    await repository.editTerm(term, id);
  }

  async function removeTermFromList(id: string): Promise<void> {
    // @ts-ignore
    dispatch({type: RepoAction.removeTermFromList, id});
    await repository.removeTerm(id);
  }

  function showLoader() {
    // @ts-ignore
    dispatch({type: RepoAction.showLoader})
  }

  function hideLoader() {
    // @ts-ignore
    dispatch({type: RepoAction.hideLoader})
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
