import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';

const App = ()=> (
  <Fragment>
      <Navbar></Navbar>
      <Landing></Landing>
  </Fragment>
);
/* () when no explicit return statement   */

export default App;
