import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_NODE_API_URL;

/* Creates a config file for the routes */
// const getHeaders = () =>
//   createAsyncThunk(async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");
//       const jwt = JSON.parse(token).token;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//            Authorization: `${jwt}`,
//         },
//       };
//       return config;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   });

/* Handles the API call for user login */
export const login = createAsyncThunk(async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = await axios.post(
    `${API_URL}/login/`,
    { email, password },
    config
  );
  return data;
});

/* Handles the API call for user registration. */
export const registerUser = createAsyncThunk(
  "user/register",

  async ({ name, email, password, thunkAPI }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `${API_URL}/api/v1/register`,
        name,
        email,
        password,
        config
      );
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      }
    } catch (error) {
      console.log(error.message);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getHeaders = createAsyncThunk(
  "user/token",
  async ({ token }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(`${API_URL}/api/v1/user`, token, config);
      if (response === 200) {
        return { ...response };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respons.data);
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: '',
      email: '',
      password: '',
    },
    status: 'idle',
    toggle: 'login',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    token: '',
    header: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = null;
    },
    toggleAuth: (state,action) => {
      state.toggle = action.payload || (state.toggle === 'login' ? 'register' : 'login');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getHeaders.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getHeaders.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.header = action.payload.headers;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(getHeaders.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearState, toggleAuth } = authSlice.actions;

export const userSelector = (state) => state.auth;



