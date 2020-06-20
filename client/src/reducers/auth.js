import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/types';


const initialState = {
    toekn : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}


export default function(state = initialState,action){
    const { type, payload } =  action;
    switch(type){
        case REGISTER_SUCCESS :
            localStorage.setItem('token',payload.toekn);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }

        case AUTH_ERROR :
        case  REGISTER_FAIL :
            localStorage.removeItem('token')
            return {
                ...state,
                token : null,
                isAuthenticated: false,
                loading: false,     
            }
        case USER_LOADED :
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                isAuthenticated: true,
                user: payload
                
            }
        default :
            return state;
        
    }
}   

