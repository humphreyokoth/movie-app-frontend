import axios from 'axios';

export const api = axios.create({
    apiUrl:'http://localhost:5000'
})
