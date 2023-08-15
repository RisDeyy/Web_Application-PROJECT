
import { createDispatchHook, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {loginFailed} from "../../redux/authSlice"
import { useFormik } from "formik";
import { AllAccount} from "../../redux/apiRequest";
import { allProductsOrder} from "../../redux/apiRequest";
import {allProducts}from "../../redux/apiRequest";

import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFetching = useSelector((state) => state.auth.login.isFetching);
const [error,setError] = useState(false);
  const loginError = useSelector((state) => state.auth.login.error);
  const msg = useSelector((state) => state.auth.msg);
  
  useEffect(()=>{
    allProducts(dispatch);
    AllAccount( dispatch);
    allProductsOrder(dispatch);

setError(false);
  },[])
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required"),
        
      
      password: Yup.string()
        .required("Required"),
       
     
    }),
    
    onSubmit: (values) => {
    
      const newUser = {
        password:values.password,
        username:values.name
     
    };
    
    loginUser(newUser, dispatch, navigate);
    setError(loginError);
    console.log(loginError);
   {loginError &&(window.alert("Incorrect username or Incorrect password"))}
    },
  });
  
  
  return (
     <div className="main">
      <p className="sign" align="center">
        Sign in
      </p>
    <section>
    <form className="form1" onSubmit={formik.handleSubmit}>
      <input 
      className="username"
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Enter your name"
      />
      {formik.errors.name && (
        <p className="errorMsglogin1"> {formik.errors.name} </p>
      )}
      <br></br>
      <input
      className="password"
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Enter your password"
      />
      {formik.errors.password && (
        <p className="errorMsglogin2"> {formik.errors.password} </p>
      )}
     
      <button className="submit" align="center" type="submit"> Continue </button>
      </form>
  </section>
  </div>
   
  );
};

export default Login;




// import React from "react";

// function Form() {
//   return (
//     <div className="main">
//       <p className="sign" align="center">
//         Sign in
//       </p>
//       <form className="form1">
//         <input className="username" type="text" placeholder="Username" />
//         <input className="password" type="password" placeholder="Password" />
//         <a className="submit" align="center">
//           Sign in
//         </a>
//         <p className="forgot" align="center">
//           <a href="#">Forgot Password? </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Form;

