import React, {createRef, ReactElement, useContext} from 'react';
import {Box, Grid, Spinner} from '@chakra-ui/react';
import {RepoContext} from '../../context/Repo/RepoContext';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {TermsItem} from '../TermsItem';
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';
import {termsAPI} from '../../services/api/termsAPI';

export default function Component() {
  const {removeTermFromList} = useContext(RepoContext);
  const {data: termsList, isLoading} = termsAPI.useFetchTermsQuery();
  const noTermsRef = createRef() as React.Ref<HTMLDivElement> | undefined;

  function removeTerm(id: string): void {
    void removeTermFromList(id);
  }

  function getTemplate(): JSX.Element[] | ReactElement {
    const transitionStyles = {
      entered: {fontSize: 'initial', opacity: 1}
    };

    if (!termsList || termsList.length === 0) {
      return (
        <Transition
          in={true}
          timeout={800}
          nodeRef={noTermsRef}
        >
          {(state) => {
            const transitionStyle = transitionStyles[state as keyof typeof transitionStyles];
            return (
              <Box
                textAlign="center"
                style={{...{fontSize: 0, opacity: 0, transition: 'opacity 0.2s'}, ...transitionStyle}}
                ref={noTermsRef}
              >
                No terms yet
              </Box>
            );
          }}
        </Transition>
      );
    }

    return (
      <TransitionGroup
        component={Grid}
        gap={6}
      >
        {
          termsList.map((item: TermItem) => {
            const itemRef = createRef() as React.Ref<HTMLDivElement> | undefined;
            return (
              <CSSTransition
                key={item.id}
                classNames={'term'}
                timeout={800}
                nodeRef={itemRef}
              >
                <div ref={itemRef}>
                  <TermsItem term={item.term} definition={item.definition} id={item.id} key={item.id}
                             removeTerm={removeTerm}/>
                </div>
              </CSSTransition>
            );
          })
        }
      </TransitionGroup>
    );
  }

  return (
    <Box data-testid="terms-list">
      {
        isLoading ? <Spinner display="block" m="auto"/> : getTemplate()
      }
    </Box>
  );
}
