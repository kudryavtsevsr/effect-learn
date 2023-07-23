import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {RouterProvider} from 'react-router-dom';
import {RepoProvider} from './context/Repo/RepoProvider';
import {router} from './router';

function App() {
  return (
    <ChakraProvider>
      <RepoProvider>
        <RouterProvider router={router}/>
      </RepoProvider>
    </ChakraProvider>
  );
}

export default App;
