import {Box, Container, Flex, Button, Spinner} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, RepeatIcon} from '@chakra-ui/icons';
import React, {ReactElement, useState} from 'react';
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

  function toggleCard() {
    setIsCardFlipped(isCardFlipped => !isCardFlipped);
  }

  async function resetCardFlip() {
    await setIsInnerTransition(false)
    await setIsCardFlipped(false)
    setTimeout(() => setIsInnerTransition(true), 100)
  }

  async function goToPrevCard() {
    await resetCardFlip();
    setCurrentItemIndex(currentItemIndex => currentItemIndex - 1);
  }

  async function goToNextCard() {
    await resetCardFlip();
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
          <Box className={cx('flip-card-inner', {'flip-card-inner--transition': isInnerTransition})}>
            <Box className={cx('flip-card-front')}>
              <Box
                pos="relative"
                bg="gray.100"
                borderRadius="md"
                p={6}
                onClick={toggleCard}
              >
                <Box pos="absolute" opacity="0.5" top="10px" right="10px">{getProgressIndicator()}</Box>
                <ReactMarkdown components={ChakraUIRenderer()} children={String(termsList?.[currentItemIndex]?.definition)}
                               skipHtml/>
              </Box>
            </Box>
            <Box className={cx('flip-card-back')}>
              <Box
                pos="relative"
                bg="gray.100"
                borderRadius="md"
                p={6}
                onClick={toggleCard}
              >
                <Box pos="absolute" opacity="0.5" top="10px" right="10px">{getProgressIndicator()}</Box>
                <ReactMarkdown components={ChakraUIRenderer()} children={String(termsList?.[currentItemIndex]?.term)} skipHtml/>
              </Box>
            </Box>
          </Box>
        </Box>
        <Flex justify="space-between" gap={5}>
          <Button colorScheme="blue" leftIcon={<ArrowBackIcon/>} onClick={goToPrevCard} disabled={isCurrentCardFirst()}>
            Prev term
          </Button>
          {
            isCurrentCardLast()
            && (<Button colorScheme="blue" rightIcon={<RepeatIcon/>} onClick={repeatStudy}>
              Repeat
            </Button>)
          }
          <Button colorScheme="blue" rightIcon={<ArrowForwardIcon/>} onClick={goToNextCard}
                  disabled={isCurrentCardLast()}>
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
