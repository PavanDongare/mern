import React, {Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import {axios} from 'axios'; 
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';


export const Regsiter = (props) => {

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
            props.setAlert('passwords do not match','danger');
            console.log('passwords do not match');
        }
            
        else 
            console.log(formData);   
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
                   required />
  
        
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
}


export default connect(null,{ setAlert })(Regsiter); // this allows to access props.setalert



{/* 
        setformData
        param: 1 single object { original obj , data to change in original }
        original: ...formData // copy or main state
        data to change: [e.target.name]: e.target.value
                        [e.target.name] -> gets name of attribute of html element
                        e.target.value  -> value

        question?
        why [] syntax ?
        why : syntax ?


            value="name" // sets value to 'name' literally
            value={name} // value of variable name
            Question? is it two way binding or one way?
            one way with {} // html to js

    
     * why use useState hook?
     *   1 we can eaisly access formData directly
     *   2 set using setForm method defined
    

*/}