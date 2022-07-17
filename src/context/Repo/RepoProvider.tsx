import React, {ReactNode, useReducer} from 'react';
import {FakeRepo} from '../../repository/fake-repo';
import { RepoContext } from './RepoContext';
import {repoReducer} from './RepoReducer';
import {RepoAction} from '../actions';
import {TermItem} from '../../repository/fixtures/terms-list-mock';

interface Props {
  children?: ReactNode
}

export interface RepoContextType {
  fetchTermsList: () => Promise<void>,
  addTermToList: (term: TermItem) => Promise<void>,
  editTermInList: (term: TermItem, index: number) => Promise<void>,
  termsList: TermItem[]
}

const useFakeRepo = process.env.USE_FAKE_REPO;

export const RepoProvider = ({children}: Props) => {
  // @ts-ignore
  const [{termsList}, dispatch] = useReducer(repoReducer, {termsList: []});

  const repository = useFakeRepo ? new FakeRepo() : new FakeRepo();

  async function fetchTermsList(): Promise<void> {
    const currentTermsList = await repository.getTermsList();
    // @ts-ignore
    dispatch({type: RepoAction.getTermsList, currentTermsList});
  }

  async function addTermToList(term: TermItem): Promise<void> {
    // @ts-ignore
    dispatch({type: RepoAction.addTermToList, term});
  }

  async function editTermInList(term: TermItem, index: number): Promise<void> {
    // @ts-ignore
    dispatch({type: RepoAction.editTermInList, term, index});
  }

  return (
    <RepoContext.Provider value={{fetchTermsList, addTermToList, editTermInList, termsList}}>
      {children}
    </RepoContext.Provider>
  );
};
