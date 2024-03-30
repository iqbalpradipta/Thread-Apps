import { createSlice } from '@reduxjs/toolkit';
import { IFollows } from '../../types/followsInterface';

const initialFollowSlice: { data: { following: IFollows[], follower: IFollows[] } } = {
  data: {
    following: [],
    follower: []
  }
};
const initialFollowingSlice: {data: IFollows} = {
  data: {
    usersFollowing: {
      id: 0
    },
    usersFollower: {
      id: 0
    }
  }
}

export const getFollowSlice = createSlice({
  name: 'follow',
  initialState: initialFollowSlice,
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