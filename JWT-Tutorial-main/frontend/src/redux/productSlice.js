import { createSlice } from "@reduxjs/toolkit";
import { allProducts } from "./apiRequest";

const productSlice = createSlice({
    name: "product",
    initialState:{
          //productOrder
        padding:false,
        error:false,
        product:null,
        //All product
        allProducts:null,
        //save Product
        saveProduct:null,
        //Theme 
        themecustem:"dark",
    },
    reducers:{
  ThemeSetCus: (state,action)=>{
    state.themecustem = action.payload;
  }  , 

     saveProduct: (state,action)=>{
       state.saveProduct = action.payload;
     }  , 
    AllproductStart: (state) => {
            state.padding=true;
     },
     AllproductSucces: (state,action) => {
         state.padding = false;
         state.error = false;
         state.allProducts = action.payload;
     },
    AllproductFaile: (state) => {
         state.error = true;
     }      ,

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
    productFaile,
    AllproductStart,
    AllproductSucces,
    AllproductFaile,
    saveProduct,
    ThemeSetCus
} = productSlice.actions;
export default productSlice.reducer;