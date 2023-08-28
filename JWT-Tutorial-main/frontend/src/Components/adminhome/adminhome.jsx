import { createAxios } from "../../createInstance";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import {  getAllUsers } from "../../redux/apiRequest";
import { getRevenue } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";

const AdminHonme = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const revenue = useSelector((state)=>state.revenue?.revenue)
    const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getRevenue(dispatch);
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  },[]);

    return ( 
        <>
         <div>
      <CountUp start={0} end={1000} duration={3} />
    </div>
        </>
     );
}
 
export default AdminHonme;