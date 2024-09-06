import { configureStore } from "@reduxjs/toolkit";
import userReducer from './searchSlice'
import { useDispatch } from "react-redux";
import LikeCommentReducer from './LikeCommentSlice'
import ChatReducer from './chatSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        LikesComments: LikeCommentReducer,
        Chats: ChatReducer

        

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;