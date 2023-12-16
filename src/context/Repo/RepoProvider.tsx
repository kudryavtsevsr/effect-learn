import React, {ReactElement, ReactNode, useReducer} from 'react';
import {FakeRepo} from '../../repository/fake-repo';
import {RepoContext} from './RepoContext';
import {repoReducer} from './RepoReducer';
import {repoActionKind} from '../action-kinds';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {FirebaseRepo} from '../../repository/firebase-repo';
import {Spinner} from '@chakra-ui/react';

interface Props {
  children?: ReactNode;
}

export interface RepoContextType {
  fetchTermsList: () => Promise<void>,
  fetchTermsListWithPageLoaderDisplay: () => Promise<void>,
  addTermToList: (term: TermItem) => Promise<void>,
  editTermInList: (term: Omit<TermItem, 'id'>, id: string) => Promise<void>,
  removeTermFromList: (id: string) => Promise<void>,
  getTermsList: () => TermItem[],
  termsList: TermItem[],
  showLoader: () => void,
  hideLoader: () => void,
  showTemplateWhenTermsReadyToDisplay: (template: JSX.Element[] | ReactElement) => JSX.Element[] | ReactElement
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

  async function fetchTermsListWithPageLoaderDisplay(): Promise<void> {
    if (termsList.length !== 0 || isLoading) {
      return;
    }

    showLoader();
    fetchTermsList().finally(() => {
      hideLoader();
    });
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

  function getTermsList(): TermItem[] {
    if (termsList.length === 0) {
      void fetchTermsList();
    }

    return termsList;
  }

  function showLoader() {
    dispatch({type: repoActionKind.showLoader});
  }

  function hideLoader() {
    dispatch({type: repoActionKind.hideLoader});
  }

  function showTemplateWhenTermsReadyToDisplay(template: JSX.Element[] | ReactElement) {
    return (
      isLoading
        ? <Spinner display="block" m="auto"/>
        : template
    );
  }

  return (
    <RepoContext.Provider value={{
      fetchTermsList,
      fetchTermsListWithPageLoaderDisplay,
      addTermToList,
      editTermInList,
      removeTermFromList,
      getTermsList,
      termsList,
      showLoader,
      hideLoader,
      showTemplateWhenTermsReadyToDisplay,
      isLoading
    }}>
      {children}
    </RepoContext.Provider>
  );
};
