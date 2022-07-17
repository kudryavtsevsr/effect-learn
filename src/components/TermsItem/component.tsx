import {Grid} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Form} from '../Form';

interface Properties {
  term: string;
  definition: string;
  index: number;
}

export default function Component({term, definition, index}: Properties) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function showForm(): void {
    setIsFormVisible(true);
  }

  function hideForm(): void {
    setIsFormVisible(false);
  }

  return (
    <>
      {
        isFormVisible
          ? (
            <Form initialTerm={term} initialDefinition={definition} index={index} onEdited={hideForm}/>
          )
          : (
            <Grid templateColumns="repeat(2, 1fr)" gap={6} p={6} bg="gray.100" borderRadius="md" onDoubleClick={showForm} title="Double click for edit">
              <div>
                {term}
              </div>
              <div dangerouslySetInnerHTML={{__html: definition}}/>
            </Grid>
          )
      }
    </>
  );
}
