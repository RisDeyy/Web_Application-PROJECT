import "./signup.css";
import { createDispatchHook, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {loginFailed} from "../../redux/authSlice"
import { useFormik } from "formik";
import { AllAccount} from "../../redux/apiRequest";
import { allProducts} from "../../redux/apiRequest";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFetching = useSelector((state) => state.auth.login.isFetching);
const [error,setError] = useState(false);
  const loginError = useSelector((state) => state.auth.login.error);
  const msg = useSelector((state) => state.auth.msg);
  
  useEffect(()=>{
    AllAccount( dispatch);
    allProducts(dispatch);

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
    <div class="App">
    <section>
    <form className="infoform" onSubmit={formik.handleSubmit}>
      <label> Your name </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Enter your name"
      />
      {formik.errors.name && (
        <p className="errorMsg"> {formik.errors.name} </p>
      )}
      
      <label> Password </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Enter your password"
      />
      {formik.errors.password && (
        <p className="errorMsg"> {formik.errors.password} </p>
      )}
     
      <button type="submit"> Continue </button>
      </form>
  </section>
  </div>
   
  );
};

export default Login;



