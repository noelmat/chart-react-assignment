import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
    name: "chartData",
    initialState: {
        data: [],
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },

        changeData: (state, action) => {
            const { payload } = action; 
            const { chartIdx, elIdx, value } = payload;
            const newState = state.data;
            newState[chartIdx].elements[elIdx] = value;
            state.data = newState;
        }
    }
})


export const { setData, changeData } = chartSlice.actions;

export default chartSlice.reducer;