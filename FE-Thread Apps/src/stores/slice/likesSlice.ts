import { createSlice } from "@reduxjs/toolkit";
import { ILikes } from "../../types/LikesInterface";

const initialLikePost: { data: ILikes } = {
    data: {
        threads: 0
    }
}

export const PostLikeSlice = createSlice ({
    name: 'like',
    initialState: initialLikePost,
    reducers: {
        POST_LIKE(state, action) {
                state.data = action.payload.data
        }
    }
})