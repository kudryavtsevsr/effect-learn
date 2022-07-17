import React from 'react';
import {ChakraProvider, Container, Grid} from '@chakra-ui/react';
import {Header} from './components/Header';
import {Form} from './components/Form';
import {TermsList} from './components/TermsList';
import {RepoProvider} from './context/Repo/RepoProvider';

function App() {
  return (
    <ChakraProvider>
      <RepoProvider>
        <Header/>
        <Container pt='50px' pb='50px'>
          <Grid gap={10}>
            <Form/>
            <TermsList />
          </Grid>
        </Container>
      </RepoProvider>
    </ChakraProvider>
  );
}

export default App;
