import React, {ReactElement, useContext, useEffect} from 'react';
import {Box, Grid, Spinner} from '@chakra-ui/react';
import {RepoContext} from '../../context/Repo/RepoContext';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {TermsItem} from '../TermsItem';

export default function Component() {
  const {fetchTermsList, removeTermFromList, showLoader, hideLoader, termsList, isLoading} = useContext(RepoContext);

  console.log('termsList', termsList);

  useEffecterteter(() => {
    console.log('useEffect');
    if (termsList.length !== 0 || isLoading) {
      return;
    }

    showLoader();
    fetchTermsList().finally(() => {
      hideLoader();
    });
  }, []);

  function removeTerm(id: string): void {
    void removeTermFromList(id)
  }

  function getTemplate(): JSX.Element[] | ReactElement {
    if (termsList.length === 0) {
      return (
        <Box textAlign="center">No terms yet</Box>
      );
    }

    return (
      termsList.map((item: TermItem, index: number) => (
        <TermsItem term={item.term} definition={item.definition} id={item.id} key={item.id} removeTerm={removeTerm}/>
      ))
    );
  }

  return (
    <Grid gap={6}>
      {
        isLoading
          ? (<Spinner m='auto'/>)
          : getTemplate()
      }
    </Grid>
  );
}
