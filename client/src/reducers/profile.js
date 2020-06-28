import React from 'react'
import PropTypes from 'prop-types'
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, LOGOUT, UPDATE_PROFILE, GET_ALLPROFILES } from '../actions/types';


 const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
 }

export default function(state = initialState, action){
  const { type , payload } = action ;

  switch(type){
     case GET_ALLPROFILES:
     return {
         ...state,
         profiles: payload,
         loading: false
     }
     case GET_PROFILE :
     case UPDATE_PROFILE:
        return {
            ...state,
            profile: payload,
            loading: false
        }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case LOGOUT:
            return {
                ...state,
                profile: null,
            }
        case CLEAR_PROFILE:  
            return{
                ...state,
                profile: null,
            }
        default:
             return state;
  }
}

