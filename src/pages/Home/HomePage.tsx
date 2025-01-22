import {Container, Grid} from '@chakra-ui/react';
import {Form} from '../../components/Form';
import {TermsList} from '../../components/TermsList';
import React from 'react';

export default function HomePage() {
  return (
    <Container pt="50px" pb="50px">
      <Grid gap={10}>
        <Form/>
        <TermsList/>
      </Grid>
    </Container>
  );
}
