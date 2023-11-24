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
export const registerUser = createAsyncThunk(
  'user/register',

async ({name,email,password,thunkAPI}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = await axios.post(`${API_URL}/api/v1/register`,name,email,password, config)
   if(data) {
    localStorage.setItem('token',data.token);
    return data;
   }
  } catch (error) {
    console.log(error.message);
    thunkAPI.rejectWithValue(error.message);
  }
  
})

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
  name:'',
  email:'',
  password:'',
  status:'idle',
  isFetching:false,
  isSuccess:false,
  isError:false,
  errorMessage:'',

},
reducers:{
  clearState:(state) =>{
    state.isError = false;
    state.isSuccess = false;
    state.isFetching = false;
    state.errorMessage= null;
  }
},
extraReducers: builder=>{
  builder
  .addCase(registerUser.pending,(state)=>{
    state.isFetching= true;
  })
  .addCase(registerUser.fulfilled,(state,action)=>{
    state.isFetching = false;
    state.isSuccess = true;
    state.user.name = action.payload.name;
    state.user.email = action.payload.email;
    state.user.password = action.payload.password;
   
  })
  .addCase(registerUser.rejected,(state,action) =>{
    state.isFetching = false;
    state.isError = true;
    state.errorMessage = action.error.message;
  })


}
})
export const {clearState} = userSlice.actions;
export const userSelector = (state)=>state.user;
