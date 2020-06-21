import { combineReducers } from 'redux';
import alert  from './alerts.reducer';
import auth from './auth';
import profile from './profile'
export default combineReducers({
    alert,
    auth,
    profile,
});