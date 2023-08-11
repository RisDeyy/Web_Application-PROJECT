import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        users: {
            allUsers:null,
            isFetching:false,
            error:false
        },
        
        //changePass
            Fetching:false,
            Error:false,
            success:false,
       ///notification
            fetching:false,
            erro:false,
            notification:null,
            newNotification:null,
        msg:"",
    },
    reducers:{
        newNotification: (state,action)=>{
          newNotification = action.payload;
        },
        notificationStart: (state)=>{
            state.fetching = true;
        },
        notificationSuccess: (state,action) =>{
            state.fetching = false;
            state.erro = false;
            state.notification = action.payload;
        },
        notificationFailed: (state) => {
            state.Fetching = false;
            state.Error = true;
        },
        changepassStart: (state)=>{
            state.Fetching = true;
        },
        changepassSuccess: (state) =>{
            state.Fetching = false;
            state.Error = false;
            state.success = true;
        },
        changepassFailed: (state) => {
            state.Fetching = false;
            state.Error = true;
        },
        
        getUsersStart: (state)=>{
            state.users.isFetching = true;
        },
        getUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state)=>{
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state,action)=>{
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state,action)=>{
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUsersSuccess,
    deleteUserFailed,
    changepassStart,
    changepassSuccess,
    changepassFailed,
    notificationStart,
    notificationSuccess,
    notificationFailed,
    newNotification
} = userSlice.actions;

export default userSlice.reducer;