import React, {Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import {axios} from 'axios'; 

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // useState returns a staeful value & function to update it

    const { email,password} = formData;
    

    const onChange = e=> setFormData({ ...formData , [e.target.name]: e.target.value });
   

    const onSubmit = e => {
        e.preventDefault();
     
        console.log(formData);   
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
           
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
}


export default Login;



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