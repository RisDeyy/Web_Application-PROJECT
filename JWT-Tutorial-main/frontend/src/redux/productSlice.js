import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState:{
          //product 
        padding:false,
        error:false,
        product:null
    },
    reducers:{
productStart: (state) => {
       state.padding=true;
},
productSucces: (state,action) => {
    state.padding = false;
    state.error = false;
    state.product = action.payload;
},
productFaile: (state) => {
    state.error = true;
}
    }

    

    })
export const {
    productStart,
    productSucces,
    productFaile

} = productSlice.actions;
export default productSlice.reducer;