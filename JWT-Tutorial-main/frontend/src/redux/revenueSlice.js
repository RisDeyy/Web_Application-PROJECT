import { createSlice } from "@reduxjs/toolkit";

const revenueSlice = createSlice({
    name: "revenue",
    initialState:{
    panding : false,
    revenue: null,
    error:false
    },
    reducer:{
getRenvenueStart:(state)=>{
state.panding = true;
}  ,      
getRevenueSucces:(state,action)=>{
state.panding= false;    
state.revenue = action.payload;
state.error = false;
},
getRenvenueError:(state)=>{
state.error = true;
state.panding = false;

},
    },
})
export const {
    getRenvenueStart,
    getRevenueSucces,
    getRenvenueError

} = revenueSlice.actions;
export default revenueSlice.reducer;