import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateTypes {
    [key: string]: string[];
    
}

const initialState: initialStateTypes = {}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        cacheResults: (state, action: PayloadAction<initialStateTypes>) =>{
            const searchQueryKey = Object.keys(action.payload)[0] as string
            const results = action.payload[searchQueryKey]
            if (state[searchQueryKey]) {
                state[searchQueryKey] = [...state.searchQueryKey, ...state.results]

            } else {
                state[searchQueryKey] = results
            }
        }
    }
})

export default searchSlice.reducer;
export const {cacheResults} = searchSlice.actions