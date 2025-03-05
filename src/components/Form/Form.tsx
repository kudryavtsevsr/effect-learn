import React, {useState} from 'react';
import {Button, Grid, GridItem, FormControl, FormLabel, Textarea} from '@chakra-ui/react';
import {termsAPI} from '../../services/api/termsAPI';

interface Properties {
  initialTerm?: string;
  initialDefinition?: string;
  id?: string;
  externalId?: string;
  onEdited?: () => void;
}

export default function Form({initialTerm = '', initialDefinition = '', id, externalId, onEdited}: Properties) {
  const [term, setTerm] = useState(initialTerm);
  const [definition, setDefinition] = useState(initialDefinition);

  const [requestTermUpdating] = termsAPI.useUpdateTermsMutation();
  const [requestTermCreating] = termsAPI.useCreateTermsMutation();

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
      void requestTermCreating({
        id: Date.now().toString(),
        term: trimmedTerm,
        definition: trimmedDefinition,
        order: Date.now()
      });
      clearForm();
    }
  }

  function editTerm(): void {
    const trimmedTerm = term.trim();
    const trimmedDefinition = definition.trim();
    if (trimmedTerm !== '' && trimmedDefinition !== '' && id !== undefined && externalId !== undefined) {
      void requestTermUpdating({
        id,
        term: trimmedTerm,
        definition: trimmedDefinition,
        externalId,
        order: Date.now()
      });
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
