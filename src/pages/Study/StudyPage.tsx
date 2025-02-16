import {Box, Container, Flex, Button, Spinner} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, RepeatIcon} from '@chakra-ui/icons';
import React, {ReactElement, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import classNames from 'classnames/bind';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import styles from './StudyPage.module.scss';
import {termsAPI} from '../../services/api/termsAPI';

const cx = classNames.bind(styles);

export default function StudyPage() {
  const {data: termsList, isLoading} = termsAPI.useFetchTermsQuery();

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isInnerTransition, setIsInnerTransition] = useState(true);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  function toggleCard() {
    setIsCardFlipped(isCardFlipped => !isCardFlipped);
  }

  async function resetCardFlip() {
    await setIsInnerTransition(false);
    await setIsCardFlipped(false);
    setTimeout(() => setIsInnerTransition(true), 100);
  }

  async function goToPrevCard() {
    await resetCardFlip();
    setDirection('right');
    setCurrentItemIndex(currentItemIndex => currentItemIndex - 1);
  }

  async function goToNextCard() {
    await resetCardFlip();
    setDirection('left');
    setCurrentItemIndex(currentItemIndex => currentItemIndex + 1);
  }

  async function repeatStudy() {
    await resetCardFlip();
    setCurrentItemIndex(0);
  }

  function isCurrentCardFirst() {
    return currentItemIndex === 0;
  }

  function isCurrentCardLast() {
    if (!termsList) {
      return
    }

    return currentItemIndex === termsList.length - 1;
  }

  function getProgressIndicator() {
    if (!termsList) {
      return
    }

    return `${currentItemIndex + 1}/${termsList.length}`;
  }

  function getTemplate(): JSX.Element[] | ReactElement {
    return (
      <Flex direction="column" gap={5}>
        <Box className={cx('flip-card', {'flip-card--flipped': isCardFlipped})}>
          <TransitionGroup className={cx('transition-group')}>
            <CSSTransition
              key={currentItemIndex}
              timeout={300}
              classNames={{
                enter: cx(`slide-${direction}-enter`),
                enterActive: cx(`slide-${direction}-enter-active`),
                exit: cx(`slide-${direction}-exit`),
                exitActive: cx(`slide-${direction}-exit-active`),
              }}
            >
              <Box className={cx('flip-card-inner', {'flip-card-inner--transition': isInnerTransition})}>
                <Box className={cx('flip-card-front')}>
                  <Box
                    className={cx('flip-card-content')}
                    pos="relative"
                    bg="gray.100"
                    borderRadius="md"
                    p={6}
                    onClick={toggleCard}
                  >
                    <Box pos="absolute" opacity="0.5" top="10px" right="10px">{getProgressIndicator()}</Box>
                    <Box className={cx('flip-card-content-scroll')}>
                      <ReactMarkdown 
                        components={ChakraUIRenderer()} 
                        children={String(termsList?.[currentItemIndex]?.definition)}
                        skipHtml
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className={cx('flip-card-back')}>
                  <Box
                    className={cx('flip-card-content')}
                    pos="relative"
                    bg="gray.100"
                    borderRadius="md"
                    p={6}
                    onClick={toggleCard}
                  >
                    <Box pos="absolute" opacity="0.5" top="10px" right="10px">{getProgressIndicator()}</Box>
                    <Box className={cx('flip-card-content-scroll')}>
                      <ReactMarkdown 
                        components={ChakraUIRenderer()} 
                        children={String(termsList?.[currentItemIndex]?.term)}
                        skipHtml
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CSSTransition>
          </TransitionGroup>
        </Box>
        <Flex justify="space-between" gap={5}>
          <Button colorScheme="blue" leftIcon={<ArrowBackIcon/>} onClick={goToPrevCard} isDisabled={isCurrentCardFirst()}>
            Prev term
          </Button>
          {
            isCurrentCardLast()
            && (<Button colorScheme="blue" rightIcon={<RepeatIcon/>} onClick={repeatStudy}>
              Repeat
            </Button>)
          }
          <Button colorScheme="blue" rightIcon={<ArrowForwardIcon/>} onClick={goToNextCard}
                  isDisabled={isCurrentCardLast()}>
            Next term
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Box data-testid="terms-list">
      <Container pt="50px" pb="50px">
        {
          isLoading ? <Spinner display="block" m="auto"/> : getTemplate()
        }
      </Container>
    </Box>
  );
}
