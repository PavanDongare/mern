import axios from 'axios';
import{
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { setAlert } from './alertAction';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}




// Register user

export const register = ({name,email,password})=> async dispatch=>{
    const config = {
        headers: {
            'content-type':'application/json',
        }
    }

    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post('/api/auth/signup',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    }
    catch(err){
        const errors =  err.response.data.errors;
        if(errors){
                dispatch(setAlert(JSON.stringify(errors),'danger'));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
}   

export const loginAction = ({email,password})=> async dispatch=>{
    const config = {
        headers: {
            'content-type':'application/json',
        }
    }

    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth/login',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    }
    catch(err){
        
        if(err){
                dispatch(setAlert(JSON.stringify(err),'danger'));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}   



/*
    to do
    update backend to give error response when 
        database not connected
        x-auth-token header not found

*/