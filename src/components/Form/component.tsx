import React, {useContext, useState} from 'react';
import {Button, Grid, GridItem, FormControl, FormLabel, Textarea} from '@chakra-ui/react';
import {RepoContext} from '../../context/Repo/RepoContext';

interface Properties {
  initialTerm?: string;
  initialDefinition?: string;
  id?: string;
  onEdited?: () => void;
}

export default function Component({initialTerm = '', initialDefinition = '', id, onEdited}: Properties) {
  const [term, setTerm] = useState(initialTerm);
  const [definition, setDefinition] = useState(initialDefinition);

  const {addTermToList, editTermInList} = useContext(RepoContext);

  function submitHandler(): void {
    if (isEditMode()) {
      editTerm();
      return;
    }

    addTerm();
  }

  function addTerm(): void {
    const trimmedTerm = term.trim();
    const trimmedDefinition = definition.trim();
    if (trimmedTerm !== '' && trimmedDefinition !== '') {
      void addTermToList({
        id: Date.now().toString(),
        term: trimmedTerm,
        definition: trimmedDefinition
      });
      clearForm();
    }
  }

  function editTerm(): void {
    const trimmedTerm = term.trim();
    const trimmedDefinition = definition.trim();
    if (trimmedTerm !== '' && trimmedDefinition !== '' && id !== undefined) {
      void editTermInList({
        term: trimmedTerm,
        definition: trimmedDefinition
      }, id);
      onEdited && onEdited();
    }
  }

  function isEditMode() {
    return id !== undefined;
  }

  function clearForm(): void {
    setTerm('');
    setDefinition('');
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} h="200px">
      <FormControl>
        <FormLabel>Term</FormLabel>
        <Textarea resize="none" value={term} onChange={e => setTerm(e.target.value)}/>
      </FormControl>
      <FormControl>
        <FormLabel>Definition</FormLabel>
        <Textarea resize="none" value={definition} onChange={e => setDefinition(e.target.value)}/>
      </FormControl>
      <GridItem colSpan={2}>
        <Button colorScheme="blue" width="100%" onClick={submitHandler}>
          {
            isEditMode() ? 'Save' : 'Add'
          }
        </Button>
      </GridItem>
    </Grid>
  );
}
