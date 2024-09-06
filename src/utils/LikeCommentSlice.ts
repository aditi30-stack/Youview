import {createSlice, PayloadAction} from "@reduxjs/toolkit";





interface LikeCommentProps {
    Like: number,
    comments: number,
    subscribe: string
    }
    

const initialState:LikeCommentProps = {
    Like: 500,
    comments: 300,
    subscribe: "Subscribe"
}

/*

action = {
type: "action-sum",
payload: {
likes: 1}}

*/

interface updatePayload {
    like?: number,
    comment?: number,
    subscribe?: "Subscribed" | "Subscribe"
}

const LikeCommentList = createSlice({
    name: "LikeComment",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<updatePayload>) =>{
            
            if(action.payload.like !== undefined) {
                state.Like +=1;
            }

            if(action.payload.comment !== undefined) {
                state.comments +=1
            }

            if(action.payload.subscribe !== undefined) {
                state.subscribe = action.payload.subscribe
            }
            
            

            
            }
           

        }
    
})

export default LikeCommentList.reducer;
export const {update} = LikeCommentList.actions;