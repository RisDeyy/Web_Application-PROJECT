import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UpdataEmail } from "../../redux/apiRequest";
import { useEffect } from "react";

const  UpdateInfo= () => {
    
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [email,setEmail] = useState("");
 
 
  const handleUpdate= (e)=>{
    e.preventDefault();
    const info={
        username:user?.username,
        email:email,
};

if(user?.accessToken){
UpdataEmail(user?.accessToken,info,dispatch,axiosJWT,navigate)}
   
  }
    return ( 
        <section className="register-container">
        <div className="register-title"> Sign up </div>
        <form onSubmit={handleUpdate}>
        <label>USERNAME</label>
          <input
           disabled = "true"
            type="text"
            value={user?.username}
           
          />
          <label>EMAIL</label>
          <input
         
            type="text"
            placeholder={user?.email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          
         
          
          <button type="submit" > Create account </button>
        </form>
       
        
         
      </section>
     );
}
 
export default UpdateInfo;