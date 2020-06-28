import React, {Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertAction';
import { register } from '../../actions/authAction';
import PropTypes from 'prop-types';



// (props)   props.setAlert
export const Regsiter = ({setAlert,register,isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // useState returns a staeful value & function to update it

    const { name,email,password,password2} = formData;
    

    const onChange = e=> setFormData({ ...formData , [e.target.name]: e.target.value });
   

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2 ){
            setAlert('passwords do not match','danger');
            console.log('passwords do not match');
        }
            
        else {
            register({name,email,password});
        }
            console.log(formData);   
    }


    // redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>;
    }

    return (
       <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <input type="text" 
                   placeholder="Name" 
                   name="name" 
                   value={name}
                   onChange = { e=> onChange(e) }
                  />
  
        
          </div>
          <div className="form-group">
            <input type="email" 
                   placeholder="Email Address" 
                   name="email" 
                   value = {email}
                   onChange = { e=> onChange(e) }
                   
                   />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value = {password2}
              onChange = { e=> onChange(e) }
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
};


Regsiter.propTypes = { 
    // is it really isRequired ?
    setAlert : PropTypes.func.isRequired , 
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStaeToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStaeToProps,{ setAlert,register })(Regsiter);
