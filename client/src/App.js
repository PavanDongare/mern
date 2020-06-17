import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Regsiter from './components/auth/Regsiter';
import Login from './components/auth/Login';


const App = ()=> (
  <Router>
  <Fragment>
       <Navbar/> 
       <Route exact path="/" component={Landing} />
            <Switch>           

                <Route path="/register" component={Regsiter} />
                <Route path="/login" component={Login} />

            </Switch>
  </Fragment>
  </Router>
 
);
/* () when no explicit return statement   */

export default App;
