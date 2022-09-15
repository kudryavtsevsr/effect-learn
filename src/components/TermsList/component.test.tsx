import {render, screen} from '@testing-library/react';
import {ChakraProvider} from '@chakra-ui/react';
import {RepoProvider} from '../../context/Repo/RepoProvider';
import {TermsList} from './index';

describe('TermsList', () => {
  it('renders component', () => {
    const page = create();
    expect(page.termsList).toBeVisible()
  });
});

function create() {
  render(
    <ChakraProvider>
      <RepoProvider>
        <TermsList/>
      </RepoProvider>
    </ChakraProvider>
  );

  return new ComponentPageObject();
}

class ComponentPageObject {
  get termsList() {
    return screen.getByTestId('terms-list');
  }
}
