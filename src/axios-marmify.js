import axios from 'axios';     

const instance = axios.create({
    baseURL: 'http://marmify.online/api/v1/'
});

export default instance;