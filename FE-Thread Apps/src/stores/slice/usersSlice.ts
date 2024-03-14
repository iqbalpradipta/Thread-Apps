import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from '../../types/threadsInterface';

const initialUsersSlice: { data: IUsers } = {
  data: {
    username: '',
    fullName: '',
    email: '',
    photo_profile: '',
  },
};

const data: IUsers[] = [];
const initialStateUsers = {
  data,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersSlice,
  reducers: {
    GET_USERS: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const usersGetSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {
    GET_ALL_USERS: (state, action) => {
      state.data = action.payload;
    },
  },
});
