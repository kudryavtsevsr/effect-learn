import React, {createRef, ReactElement} from 'react';
import {Box, Grid, Spinner} from '@chakra-ui/react';
import {TermItem} from '../../models/Term';
import {TermsItem} from '../TermsItem';
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';
import {termsAPI} from '../../services/api/termsAPI';

export default function TermsList() {
  const [requestTermDeleting] = termsAPI.useDeleteTermsMutation();
  const {data: termsList, isLoading} = termsAPI.useFetchTermsQuery();
  const noTermsRef = createRef() as React.Ref<HTMLDivElement> | undefined;

  function removeTerm(termItem: TermItem): void {
    void requestTermDeleting(termItem);
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
                  <TermsItem {...item} key={item.id}
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
