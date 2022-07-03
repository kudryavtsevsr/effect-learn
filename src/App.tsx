import React from 'react';
import {ChakraProvider, Container, Text} from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <header className='app-header'>
        <Container maxW="unset">
          <Text fontSize="20px" color="white">
            Effect learn
          </Text>
        </Container>
      </header>
    </ChakraProvider>
  );
}

export default App;
