import { combineReducers } from 'redux';
import alert  from './alerts.reducer';
import auth from './auth'
export default combineReducers({
    alert,
    auth
});