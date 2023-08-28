import { createSlice } from "@reduxjs/toolkit";



const categorySlice = createSlice({
    name: "category",
    initialState:{
  //get all category
  allcategory:null  ,
  //save category
  saveCategory:null

    },
    reducers:{
      SaveCategory: (state,action)=>{
        state.saveCategory = action.payload;
      },
        GetCategory: (state,action)=>{
            state.allcategory = action.payload;
          }  , 

    }

})

export const {
    GetCategory,
    SaveCategory
} = categorySlice.actions;

export default categorySlice.reducer;
