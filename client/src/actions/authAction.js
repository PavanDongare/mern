import axios from 'axios';
import{
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';

import { setAlert } from './alertAction';

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