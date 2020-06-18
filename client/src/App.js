import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Regsiter from './components/auth/Regsiter';
import Login from './components/auth/Login';

// Redux
/*
    Provider connects react & redux
    store 
*/
import { Provider } from 'react-redux';
import store from './store';

const App = ()=> (
<Provider store={store}>
  <Router>
    <Fragment>
         <Navbar/> 
         <Route exact path="/" component={Landing} />
          <section className="container" >
              <Switch>          
                  <Route path="/register" component={Regsiter} />
                  <Route path="/login" component={Login} />
              </Switch>
  
          </section>   
    </Fragment>
  </Router>
</Provider>
  
 
);
/* () when no explicit return statement   */

export default App;
