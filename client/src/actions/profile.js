import axios from 'axios';
import { setAlert } from './alertAction';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types'; 

// get current users profile

export const getCurrentProfile=()=> async dispatch => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error , status: error.response }
        })
    }
}

export const createProfileAction=(formData,history,edit=false)=> async dispatch => {
   try{
      const config = {
          headers: {
              'Content-Type':'application/json'
          }
      }

      const res = await axios.post('/api/profile',formData,config);
      dispatch({ type:GET_PROFILE, payload: res.data})

      if(!edit){
          history.push('/dashboard');
      }

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

   }
   catch(error){
        const errors = error.response.data.errors;
        errors && errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error , status: error.response }
        });
   }
}


// add experience
export const addExperience= (formData, history)=> async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile/experience',formData,config);
        dispatch({ type: UPDATE_PROFILE, payload: res.data});
        dispatch(setAlert('experience added', 'success'));
        history.push('/dashboard');
     }
     catch(error){
          const errors = error.response.data.errors;
          errors && errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          
          dispatch({
              type: PROFILE_ERROR,
              payload: { msg: error , status: error.response }
          });
     }
}



