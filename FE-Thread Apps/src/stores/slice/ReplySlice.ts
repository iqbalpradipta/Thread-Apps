import { createSlice } from '@reduxjs/toolkit';
import { IReplyPost } from '../../types/replyInterface';


const initialReplyPostSlice: {data: IReplyPost} = {
  data: {
    content: '',
    threads: 0,
    image: null,
  }
}

const initialReplySlice = {
  data: [],
};

export const ReplySlice = createSlice({
  name: 'reply',
  initialState: initialReplySlice,
  reducers: {
    GET_REPLY(state, action) {
      state.data = action.payload.data;
    },
  },
});

export const ReplyPostSlice = createSlice({
  name: 'reply',
  initialState: initialReplyPostSlice,
  reducers: {
    POST_REPLY: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
})
