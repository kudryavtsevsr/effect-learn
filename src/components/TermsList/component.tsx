import React, {useContext, useEffect, useState} from 'react';
import {Grid, Spinner} from '@chakra-ui/react';
import {RepoContext} from '../../context/Repo/RepoContext';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {TermsItem} from '../TermsItem';

export default function Component() {
  const {fetchTermsList, termsList} = useContext(RepoContext);

  const [isLoading, setIsLoading] = useState(false);

  console.log('termsList', termsList);

  useEffect(() => {
    console.log('useEffect');
    setIsLoading(true);
    fetchTermsList().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid gap={6}>
      {
        isLoading
          ? (<Spinner m='auto'/>)
          : termsList.map((item: TermItem, index: number) => (
            <TermsItem term={item.term} definition={item.definition} index={index} key={index}/>
          ))
      }
    </Grid>
  );
}
