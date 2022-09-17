import {Grid, Box, IconButton} from '@chakra-ui/react';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import React, {useState} from 'react';
import {Form} from '../Form';
import {useTestRerender} from '../../custom-hooks/test-rerender-hook';

export interface TermsItemProperties {
  term: string,
  definition: string,
  id: string,
  removeTerm: (id: string) => void
}

export default function Component({term, definition, id, removeTerm}: TermsItemProperties) {
  console.log('termsItem', term);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const testRerenderAttribute = useTestRerender();

  function showForm(): void {
    setIsFormVisible(true);
  }

  function hideForm(): void {
    setIsFormVisible(false);
  }

  function removeCurrentTerm(): void {
    void removeTerm(id);
  }

  return (
    <Box pos="relative" data-testid="terms-item" {...testRerenderAttribute.bind}>
      {
        isFormVisible
          ? (
            <Form initialTerm={term} initialDefinition={definition} id={id} onEdited={hideForm}/>
          )
          : (
            <>
              <IconButton pos="absolute" opacity="0.1" top="40px" right="0" aria-label="Edit" icon={<EditIcon/>}
                          onClick={showForm}/>
              <IconButton pos="absolute" opacity="0.1" top="0" right="0" aria-label="Remove" icon={<DeleteIcon/>}
                          onClick={removeCurrentTerm}/>
              <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6} bg="gray.100" borderRadius="md"
                    onDoubleClick={showForm} title="Double click for edit">
                <div data-testid="terms-item-term">
                  {term}
                </div>
                <div dangerouslySetInnerHTML={{__html: definition}} data-testid="terms-item-definition"/>
              </Grid>
            </>
          )
      }
    </Box>
  );
};
