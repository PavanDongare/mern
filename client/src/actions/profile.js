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