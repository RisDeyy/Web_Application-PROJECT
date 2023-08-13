import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  updateInfoStart,
  updateInfoFailed,
  
  
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  changepassStart,
 changepassSuccess,
 changepassFailed,
  notificationStart,
    notificationSuccess,
    notificationFailed,
    account,
    allaccount, 
    deleteAcc,

  
} from "./userSlice";
import{
  productStart,
  productSucces,
  productFaile
}  from "./productSlice"
//npm install axios
export const allProducts = async (dispatch)=>{
     dispatch(productStart);
  try{
    const res = await axios.get("/menu/product")
    dispatch(productSucces(res.data));
  }catch(err){
    dispatch(productFaile());
  }
}

export const AllAccount = async (dispatch) =>{
  try{
  const res = await axios.get("/v1/user/account")
       dispatch(allaccount(res.data));}
catch(err){
  console.log(err)
}
}
export const accUp = async(info,navigate,dispatch) =>{
  try{ 
    const res = await axios.post("/v1/user/account/update",info)
    await AllAccount( dispatch);
  navigate("/account");

  }catch(err){
    console.log(err)
  }
}
export const Notification = async ( dispatch) => {
  dispatch(notificationStart());
  try {
    const res = await axios.get("/v1/notification/notification");
    dispatch(notificationSuccess(res.data));
  } catch (err) {
    dispatch(notificationFailed());
  }
};
export const changepass = async (accessToken,user, dispatch,axiosJWT) => {
  dispatch(changepassStart());
  try {
    
    const res = await axiosJWT.post("/v1/user/UpdatePassword",user ,{
      headers: { token: `Bearer ${accessToken}` },
      
   });
   dispatch(changepassSuccess());
   
    
  } catch (err) {
    dispatch(changepassFailed());
    
  }
};
export const UpdataEmail = async (accessToken,user, dispatch,axiosJWT) => {
  
  try {
  
    const res = await axiosJWT.post("/v1/user/UpdateEmail",user ,{
      headers: { token: `Bearer ${accessToken}` },
      
   });
   dispatch(loginSuccess(res.data));
    
  } catch (err) {
  
    
  }
};

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    await  dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};


export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axios.post("/v1/auth/logout")
    dispatch(logOutSuccess());
    navigate("/login");

  } catch (err) {
    
    dispatch(logOutFailed());
  }
};
