import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
}from '../constants/userConstants.js';

const api = 'http://localhost:5000';

// login
export const login = (email,password) =>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        const config ={
            headers:{
                'Content-Type':'application/json',
            },
        };
        const {data} = await axios.post('/api/v1/login',{email,password},config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        })
        localStorage.setItem('userId',data.user.id);
        localStorage.setItem('userName',data.user.name);
    } catch (error) {
        dispatch({
           type:LOGIN_FAIL,
           payload:error.response.data.message, 
        })
    }
}

// Register

export const register = (userData) => async(dispatch)=>{
try {
    dispatch({type:REGISTER_REQUEST});
    const config ={
        headers:{
            'Content-type':'multipart/form-data',

        }
    }
    const {data}= await axios.post('/api/v1/register',userData,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:data.user,
    });
} catch (error) {
    dispatch({
        type:REGISTER_FAIL,
        payload:error.response.data.message,
    })
}
}

export const logout =()=>async(dispatch)=>{
    try {
        dispatch({
            type:LOGOUT_SUCCESS
        });
        await axios.get('/api/v1/logout');
        dispatch({
            type:LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const clearErrors =()=>async(dispatch)=>{

    dispatch({
        type:CLEAR_ERRORS
    })
}
