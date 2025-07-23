import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.0.10:8080/',    
    baseURL: 'http://192.168.0.78:8080/',
    // baseURL: 'http://192.168.2.102:8080/',
});

export default api; 