import React, {Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { loginAction } from '../../actions/authAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Login = ({loginAction, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // useState returns a staeful value & function to update it

    const { email,password} = formData;
    

    const onChange = e=> setFormData({ ...formData , [e.target.name]: e.target.value });
   

    const onSubmit = e => {
        e.preventDefault();
        loginAction({email,password});
        console.log(formData);   
    }

    // redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>;
    }

    return (
       <Fragment>
        <h1 className="large text-primary">Login</h1>
        <p className="lead"><i className="fas fa-user"></i> Login Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>

          <div className="form-group">
            <input type="email" 
                   placeholder="Email Address" 
                   name="email" 
                   value = {email}
                   onChange = { e=> onChange(e) }
                   
                   />
            
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value = {password}
              onChange = { e=> onChange(e) }
            />
          </div>
           
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/Register">Sign In</Link>
        </p>
      </Fragment>
    );
}


// login action is a prop
Login.prototype = {
    loginAction : PropTypes.func.isRequired, // since login is  a function
    isAuthenticated: PropTypes.bool
}


// listen to store state & react
const mapStaeToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

// { map state to prop, action  }
// map state to props, picks data from state & attaches it to state
// providing login action attaches action to props to consume by component
export default connect( mapStaeToProps ,{loginAction}) (Login);

