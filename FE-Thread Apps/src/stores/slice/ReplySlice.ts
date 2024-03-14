import { createSlice } from '@reduxjs/toolkit';
import { IReply, IReplyPost } from '../../types/replyInterface';

const initialReplySlice: { data: IReply } = {
  data: {
    id: 0,
    content: '',
    image: '',
    created_at: '',
    users: {
      fullName: '',
      username: '',
      email: '',
    },
    replies: []
  },
};

const initialReplyPostSlice: {data: IReplyPost} = {
  data: {
    content: '',
    created_at: '',
    image: null,
  }
}


export const ReplySlice = createSlice({
  name: 'reply',
  initialState: initialReplySlice,
  reducers: {
    GET_REPLY(state, action) {
      state.data = action.payload;
    },
  },
});

export const ReplyPostSlice = createSlice({
  name: 'reply',
  initialState: initialReplyPostSlice,
  reducers: {
    POST_REPLY(state, action) {
      state.data = action.payload
    }
  }
})
