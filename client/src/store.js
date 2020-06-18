/*
    store : for redux dev-tools
    with redux-devtool-extensin: simpler syntax
    store file: create stroe & pass things to it
    thunk : middkeware

*/



import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';





const initialState = {};
const middleware = [thunk];


const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  

export default store;