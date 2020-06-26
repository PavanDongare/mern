import axios from 'axios';
import { setAlert } from './alertAction';

import {
    GET_PROFILE,
    PROFILE_ERROR
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
            payload: { msg: error , status: error.response.status }
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
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

   }
   catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error , status: error.response.status }
        });
   }
}

