import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../types/auth';

const initialLoginSlice: { data: IAuth } = {
  data: {
    id: 0,
    username: '',
    fullName: '',
    email: '',
  },
};

export const authSlice = createSlice({
  name: 'login',
  initialState: initialLoginSlice,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      return { ...state, ...action.payload };
    },
    AUTH_CHECK: (state, action) => {
      return { ...state, ...action.payload}
    }
  },
});
