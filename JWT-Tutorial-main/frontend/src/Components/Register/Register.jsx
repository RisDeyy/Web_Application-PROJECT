import "./signup.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.css";
const Register = () => {
 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
  const registerError = useSelector((state) => state.auth.register.error);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required"),
        
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
     
    }),
    onSubmit: (values) => {
      window.alert("Form submitted");
      const newUser = {
        email: values.email,
        password:values.password,
        username:values.name
      };
      registerUser(newUser,dispatch,navigate);
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
      <label> Email address </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Enter your email"
      />
      {formik.errors.email && (
        <p className="errorMsg"> {formik.errors.email} </p>
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
      <label> Confirm Password </label>
      <input
        type="password"
        id="confirmedPassword"
        name="confirmedPassword"
        value={formik.values.confirmedPassword}
        onChange={formik.handleChange}
        placeholder="Confirm your password"
      />
      {formik.errors.confirmedPassword && (
        <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
      )}
     
      <button type="submit"> Continue </button>
    </form>
  </section>
  </div>
  );
};

export default Register;

