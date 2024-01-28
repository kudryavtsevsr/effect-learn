import {render, screen} from '@testing-library/react';
import {ChakraProvider} from '@chakra-ui/react';
import {termsList} from '../../repository/fixtures/terms-list-mock';
import {TermsItemProperties} from './TermsItem';
import {TermsItem} from './index';
import React from 'react';
import {TEST_RERENDER_ATTRIBUTE_NAME} from 'use-test-rerender';
import {Provider} from 'react-redux';
import {setupStore} from '../../store';

const testTerm1 = termsList[0];
const testTerm2 = termsList[1];
const removeTerm = () => {
};
const testProps1: TermsItemProperties = {
  ...testTerm1,
  externalId: '',
  removeTerm
};
const testProps2: TermsItemProperties = {
  ...testTerm2,
  externalId: '',
  id: testTerm1.id,
  removeTerm
};

describe('TermsItem', () => {
  it('renders component', () => {
    const {page} = create(testProps1);
    expect(page.termsItem).toBeVisible();
  });

  it('displays props data correctly', () => {
    const {page} = create(testProps1);
    expect(page.termsItemTerm).toContainHTML(testTerm1.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm1.definition);
  });

  it('is updated when props data changed', () => {
    const {page, rerenderComponent} = create(testProps1);
    expect(page.termsItemTerm).toContainHTML(testTerm1.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm1.definition);
    rerenderComponent(testProps2);
    expect(page.termsItemTerm).toContainHTML(testTerm2.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm2.definition);
    expect(page.termsItem).toHaveAttribute(TEST_RERENDER_ATTRIBUTE_NAME, '1')
  });

  it('isn\'t re rendered when props data changed if they\'re the same', () => {
    const { page, rerenderComponent}  = create(testProps1);
    expect(page.termsItemTerm).toContainHTML(testTerm1.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm1.definition);
    rerenderComponent(testProps1);
    expect(page.termsItemTerm).toContainHTML(testTerm1.term);
    expect(page.termsItemDefinition).toContainHTML(testTerm1.definition);
    expect(page.termsItem).toHaveAttribute(TEST_RERENDER_ATTRIBUTE_NAME, '0')
  });
});

function create(propsData: TermsItemProperties) {
  const store = setupStore();

  const template = (propsData: TermsItemProperties) => (
    <ChakraProvider>
      <Provider store={store}>
        <TermsItem {...propsData}/>
      </Provider>
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
