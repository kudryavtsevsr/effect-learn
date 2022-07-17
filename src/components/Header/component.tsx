import React from 'react';
import {Container, Text, Box} from '@chakra-ui/react';

export default function Component() {
  return (
    <Box bg='blue.500' p='10px'>
      <Container maxW="unset">
        <Text fontSize="20px" color="white">
          Effect learn
        </Text>
      </Container>
    </Box>
  );
}
