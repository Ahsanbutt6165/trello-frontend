import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginPayload, RegisterUser } from "../../types";
import { BACKEND_API } from "../../constants";

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ name, email, password }: RegisterUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_API}/api/user/register`, {
        name,
        email,
        password,
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_API}/api/user/login`,
        {
          email,
          password, 
        },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const fetchUser = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_API}/api/user/myprofile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
