import { createSlice } from '@reduxjs/toolkit';
import { IFollows } from '../../types/followsInterface';

const data: IFollows[] = []
const initialFollowsSlice = {
  data,
};

const initialFollowingSlice: {data: IFollows} = {
  data: {
    usersFollowing: {
      id: 0,
    }
  }
}

export const getFollowSlice = createSlice({
  name: 'follow',
  initialState: initialFollowsSlice,
  reducers: {
    GET_FOLLOW(state, action) {
      state.data = action.payload;
    },
  },
});


export const postFollowSlice = createSlice({
  name: 'follow',
  initialState: initialFollowingSlice,
  reducers: {
    POST_FOLLOW(state, action) {
      return {
        ...state, ...action.payload
      }
    }
  }
})