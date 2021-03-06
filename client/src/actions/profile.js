import axios from 'axios';
import { setAlert } from './alertAction';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    GET_ALLPROFILES,
    CLEAR_PROFILE
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


export const deleteAccount = () => async dispatch => {
    if(window.confirm('are you sure?')){
        try {
            const res = await axios.delete(`/api/auth`);
            dispatch({
                type: DELETE_ACCOUNT,
                payload: null,
            })
            dispatch(setAlert('Your Account is deleted'));
        }
        catch(error){
            dispatch({
                type: PROFILE_ERROR,
                payload: null,
            })
        }
    }
}


export const getAllProfiles = () => async dispatch => {
    dispatch({type:CLEAR_PROFILE});
    try {
        const res = await axios.get(`/api/profile/all`);
        dispatch({
            type: GET_ALLPROFILES,
            payload: res.data,
        })
    }
    catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: null,
        })
    }
    
}

export const getProfileById = (userId ) => async dispatch => {
    dispatch({type:CLEAR_PROFILE});
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        })
    }
    catch(error){
        dispatch({
            type: PROFILE_ERROR,
            payload: error,
        })
    }
    
}


