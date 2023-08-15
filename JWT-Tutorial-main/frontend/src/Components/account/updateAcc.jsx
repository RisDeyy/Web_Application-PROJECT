import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { accUp} from "../../redux/apiRequest";
const UpdateAcc = () => {
  const account = useSelector((state) => state.users?.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [address,setAddress] = useState('')
  
  const handleEdit= (e)=>{
    e.preventDefault();
    const info = {
      _id: account._id,
      email: email,
     address:address,
      name:name,
     
    };
   accUp(info,navigate,dispatch);
   
  }
  useEffect(()=>{
setName(account.name);
setAddress(account.address);
setEmail(account.email);
  },[])
  
    return (
      <section className="register-container">
        <div className="register-title"> Sign up </div>
        <form onSubmit={handleEdit}>
        <label>Username</label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label>Adress</label>
          <input
            type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
          
          
         
          
          <button type="submit" > Create account </button>
        </form>
       
        
         
      </section>
    );
  
}
 
export default UpdateAcc ;