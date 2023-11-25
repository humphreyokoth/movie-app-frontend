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

  .addCase(login.fulfilled,(state,action)=>{
    state.isFetching = false;
    state.isSuccess = true;
    state.email = action.payload.email;
    state.password = action.payload.password;
  })
  .addCase(login.rejected,(state,action)=>{
    state.isFetching = false;
    state.isError = true;
    state.errorMessage = action.payload.message;
  })
  .addCase(login.pending,(state)=>{
    state.isFetching = true;
  })

  .addCase(fetchUserByToken.pending,(state)=>{
    state.isFetching = true;

  })
  addCase(fetchUserByToken.fulfilled,(state,action)=>{
    state.isFetching = false;
    state.isSuccess = true;
    state.email = action.payload.email;
    state.name = action.payload.name;


  })
  addCase(fetchUserByToken.rejected,(state)=>{
    state.isFetching = false;
    state.isError = true;
  })


}
})
export const {clearState} = userSlice.actions;
export const userSelector = (state)=>state.user;
