import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-tojen']= token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-tojen'];
    }
}

export default setAuthToken ;