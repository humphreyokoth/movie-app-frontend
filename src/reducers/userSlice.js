import axios from 'axios';
import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = process.env.REACT_APP_NODE_API_URL


/* Creates a config file for the routes */
const getHeaders = () => {
  const tokenObject = localStorage.getItem('token')
  const jwt = JSON.parse(tokenObject).token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${jwt}`
    }
  }
  return config
}

/* Handles the API call for user login */
export const login = createAsyncThunk(
  
async ({ email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const data = await axios.post(
    `${API_URL}/login/`,
    { email, password },
    config
  )
  return data
}
);

/* Handles the API call for user registration. */
export const registerUser = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const data = await axios.post(`${API_URL}/register/`, user, config)
  return data
}

/* Handles the API call for adding a movie. */
export const addMovie = async (movie) => {
  const config = getHeaders()
  const { data } = await axios.post(`${API_URL}/movielist/`, movie, config)
  return data
}

/* Handles Api call for getting all movies */
export const getAllItems = async () => {
  const config = getHeaders()
  const data = await axios.get(`${API_URL}/movies`, config)
  return data
}

/* Handles Api call for editing an item */
export const editItem = async (movie) => {
  const config = getHeaders()
  const { data } = await axios.put(`${API_URL}/movie/${movie.id}`, movie, config)
  return data
}

/* Handles Api call for deleting an item */
export const deleteItem = async (id) => {
  const config = getHeaders()
  const { data } = await axios.delete(
    `${API_URL}/movie/${id}`, config)
  return data
}



export const userSlice = createSlice({
name:'user',
initialState:{
  username:'',
  email:'',
  isFetching:false,
  isSuccess:false,
  isError:false,
  errorMessage:'',

},
reducers:{
  clearState:(state)=>{
    state.isError = false;
    state.isSuccess = false;
    state.isFetching = false;
    return state;
  }
},
extraReducers:{
[registerUser.fullfilled]:(state,{payload})=>{
console.log('payload',payload);
state.isFetching = false;
state.isSuccess = true;
state.email = payload.user.email;
state.username = payload.user.username;

},
[registerUser.pending]:(state)=>{
  state.isFetching = true;

},
[registerUser.rejected]:(state,{payload})=>{
  state.isFetching=false;
  state.isError = false;
  state.errorMessage = payload.message;
}





}
})
export const {clearState} = userSlice.actions;
export const userSelector = (state)=>state.user;
