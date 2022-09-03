import React, {createRef, ReactElement, useContext, useEffect} from 'react';
import {Box, Grid, Spinner} from '@chakra-ui/react';
import {RepoContext} from '../../context/Repo/RepoContext';
import {TermItem} from '../../repository/fixtures/terms-list-mock';
import {TermsItem} from '../TermsItem';
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';

export default function Component() {
  const {fetchTermsList, removeTermFromList, showLoader, hideLoader, termsList, isLoading} = useContext(RepoContext);
  const noTermsRef = createRef() as React.Ref<HTMLDivElement> | undefined;

  console.log('termsList', termsList);

  useEffect(() => {
    console.log('useEffect');
    if (termsList.length !== 0 || isLoading) {
      return;
    }

    showLoader();
    fetchTermsList().finally(() => {
      hideLoader();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function removeTerm(id: string): void {
    void removeTermFromList(id);
  }

  function getTemplate(): JSX.Element[] | ReactElement {
    const transitionStyles = {
      entered: {fontSize: 'initial', opacity: 1}
    };

    return (
      <>
        <Transition
          in={termsList.length === 0}
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
      </>
    );
  }

  return (
    <Box>
      {
        isLoading
          ? <Spinner display="block" m="auto"/>
          : getTemplate()
      }
    </Box>
  );
}
