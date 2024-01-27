import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {RouterProvider} from 'react-router-dom';
import {RepoProvider} from './context/Repo/RepoProvider';
import {router} from './router';
import { Provider as ReduxProvider } from 'react-redux';
import {setupStore} from './store';

const store = setupStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <RepoProvider>
          <RouterProvider router={router}/>
        </RepoProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
