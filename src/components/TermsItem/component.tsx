import {Grid, Box, IconButton} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import React, {useState, memo} from 'react';
import {Form} from '../Form';

interface Properties {
  term: string,
  definition: string,
  id: string,
  removeTerm: (id: string) => void
}

export default memo(function Component({term, definition, id, removeTerm}: Properties) {
  console.log('termsItem', term);

  const [isFormVisible, setIsFormVisible] = useState(false);

  function showForm(): void {
    setIsFormVisible(true);
  }

  function hideForm(): void {
    setIsFormVisible(false);
  }

  function removeCurrentTerm(): void {
    void removeTerm(id)
  }

  return (
    <>
      <Box pos="relative">
        <IconButton pos="absolute" opacity="0.1" top="0" right="0" aria-label="Remove" icon={<DeleteIcon/>}
                    onClick={removeCurrentTerm}/>
        {
          isFormVisible
            ? (
              <Form initialTerm={term} initialDefinition={definition} id={id} onEdited={hideForm}/>
            )
            : (
              <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6} bg="gray.100" borderRadius="md"
                    onDoubleClick={showForm} title="Double click for edit">
                <div>
                  {term}
                </div>
                <div dangerouslySetInnerHTML={{__html: definition}}/>
              </Grid>
            )
        }
      </Box>

    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.term === nextProps.term
    || prevProps.definition === nextProps.definition
    || prevProps.id === nextProps.id;
});
