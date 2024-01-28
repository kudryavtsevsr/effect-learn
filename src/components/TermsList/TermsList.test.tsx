import {render, screen} from '@testing-library/react';
import {ChakraProvider} from '@chakra-ui/react';
import {TermsList} from './index';
import {Provider} from 'react-redux';
import {setupStore} from '../../store';

describe('TermsList', () => {
  it('renders component', () => {
    const page = create();
    expect(page.termsList).toBeVisible()
  });
});

function create() {
  const store = setupStore();

  render(
    <ChakraProvider>
      <Provider store={store}>
        <TermsList/>
      </Provider>
    </ChakraProvider>
  );

  return new ComponentPageObject();
}

class ComponentPageObject {
  get termsList() {
    return screen.getByTestId('terms-list');
  }
}
