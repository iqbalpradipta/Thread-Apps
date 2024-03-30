import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { threadDetailSlice, threadPostSlice, threadSlice } from './slice/threadSlice';
import { authSlice } from './slice/authSlice';
import { usersSlice, usersGetSlice } from './slice/usersSlice';
import { getFollowSlice, postFollowSlice } from './slice/FollowSlice';
import { ReplyPostSlice, ReplySlice } from './slice/ReplySlice';
import { PostLikeSlice } from './slice/likesSlice';

export const { GET_THREAD } = threadSlice.actions;
export const { GET_DETAIL } = threadDetailSlice.actions
export const { POST_THREAD } = threadPostSlice.actions;
export const { AUTH_LOGIN, AUTH_CHECK } = authSlice.actions;
export const { GET_USERS } = usersSlice.actions
export const { GET_ALL_USERS } =  usersGetSlice.actions
export const { GET_FOLLOW } = getFollowSlice.actions
export const { POST_FOLLOW } = postFollowSlice.actions
export const { GET_REPLY } =  ReplySlice.actions
export const { POST_REPLY } = ReplyPostSlice.actions
export const { POST_LIKE } = PostLikeSlice.actions

export const threadReducer = threadSlice.reducer;
export const threadPostReducer = threadPostSlice.reducer;
export const threadDetailReducer = threadDetailSlice.reducer;
export const authReducer = authSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const usersGetReducer = usersGetSlice.reducer;
export const getFollowReducer = getFollowSlice.reducer
export const postFollowReducer = postFollowSlice.reducer
export const getReplyReducer = ReplySlice.reducer
export const postReplyReducer = ReplyPostSlice.reducer
export const postLikeReducer = PostLikeSlice.reducer



export const rootReducer = combineReducers({
  threads: threadReducer,
  threadsPost: threadPostSlice.reducer,
  threadsDetail: threadDetailSlice.reducer,
  auth: authReducer,
  users: usersReducer,
  usersGet: usersGetReducer,
  getFollow: getFollowReducer,
  postFollow: postFollowReducer,
  getReply: getReplyReducer,
  postReply: postReplyReducer,
  postLike: postLikeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

