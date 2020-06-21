import React, { Fragment , useEffect,cleanup } from 'react';
import './App.css';

import { Landing } from './components/layout/Landing';
import  Alert  from './components/layout/Alert';
import  Navbar  from './components/layout/Navbar'; 
// prefer default import, named import on navbar gives an error
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Regsiter from './components/auth/Regsiter';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authAction';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

// component did mount   
const App = ()=> {

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])

    return (
        <Provider store={store}>
          <Router>
            <Fragment>
                 <Navbar/> 
                 <Route exact path="/" component={Landing} />
                  <section className="container" >
                      <Alert/>
                      <Switch>          
                          <Route path="/register" component={Regsiter} />
                          <Route path="/login" component={Login} />
                      </Switch>
          
                  </section>   
            </Fragment>
          </Router>
        </Provider>
          
         
        );
}  
/* () when no explicit return statement   */

export default App;
