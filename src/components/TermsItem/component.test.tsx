import {render, screen} from '@testing-library/react';
import {ChakraProvider} from '@chakra-ui/react';
import {RepoProvider} from '../../context/Repo/RepoProvider';
import {termsList} from '../../repository/fixtures/terms-list-mock';
import {TermsItemProperties} from './component';
import {TermsItem} from './index';
import React from 'react';

const testTerm = termsList[0];
const removeTerm = () => {
};
const testProps: TermsItemProperties = {
  ...testTerm,
  removeTerm
};

describe('TermsItem', () => {
  it('renders component', () => {
    const {page} = create(testProps);
    expect(page.termsItem).toBeVisible();
  });

  it('displays props data correctly', () => {
    const {page} = create(testProps);
    expect(page.termsItemTerm).toContainHTML(testTerm.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm.definition);
  });
});

function create(propsData: TermsItemProperties) {
  const template = (propsData: TermsItemProperties) => (
    <ChakraProvider>
      <RepoProvider>
        <TermsItem {...propsData}/>
      </RepoProvider>
    </ChakraProvider>
  );

  const {rerender} = render(template(propsData));

  const rerenderComponent = (propsData: TermsItemProperties) => rerender(template(propsData));

  return {page: new ComponentPageObject(), rerenderComponent};
}

class ComponentPageObject {
  get termsItem() {
    return screen.getByTestId('terms-item');
  }

  get termsItemTerm() {
    return screen.getByTestId('terms-item-term');
  }

  get termsItemDefinition() {
    return screen.getByTestId('terms-item-definition');
  }
}
