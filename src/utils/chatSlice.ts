import { createSlice, PayloadAction } from "@reduxjs/toolkit";



/*

[{
name: "Aditi",
message: "Hi how are you"},
{name: "riya",
message: "How have you been"}]

*/

interface ChatMessageProps {
    name: string,
    message: string
}

const initialState: ChatMessageProps[] = [
    {
    name: "user",
    message: "Hi how are you?"

}
]
const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        addMessage: (state, action:PayloadAction<ChatMessageProps>) =>{
            if(state.length > 10) {
                state.splice(0, 1)
            }
            state.push(action.payload)

        }
    }
    
})

export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;