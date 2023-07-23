import {Header} from '../../components/Header';
import React from 'react';
import {Outlet} from 'react-router-dom';

export default function Component() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}
