import React from 'react';
import {Text, Box, Flex} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';
import {Path} from '../../router';

export default function Header() {
  return (
    <Box bg='blue.500' p='10px'>
      <Flex
        align="center"
        gap="20px"
      >
        <NavLink to={Path.Home}>
          <Text fontSize="20px" color="white" mr="10px">
            Effect learn
          </Text>
        </NavLink>
        <NavLink to={Path.Home}>
          <Text fontSize="16px" color="white">
            Add term
          </Text>
        </NavLink>
        <NavLink to={Path.Study}>
          <Text fontSize="16px" color="white">
            Study mode
          </Text>
        </NavLink>
      </Flex>
    </Box>
  );
}
