import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UpdataEmail } from "../../redux/apiRequest";
import { useEffect } from "react";
import { useFormik } from "formik";
import { changepass } from "../../redux/apiRequest";
import * as Yup from "yup";
const  ChangePass= () => {
    
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [email,setEmail] = useState("");
 
 
    const formik = useFormik({
        initialValues: {
            newpassword: "",
          password: "",
          confirmedPassword: "",
        },
        validationSchema: Yup.object({
          newpassword: Yup.string()
            .required("Required")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                "Password must be 7-19 characters and contain at least one letter, one number and a special character"
              ),
            
          
          password: Yup.string()
            .required("Required"),
            
          confirmedPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("newpassword"), null], "Password must match"),
         
        }),
        onSubmit: (values) => {
          const newUser = {
            username: user?.username,
            password: values.password,
            newpassword:values.newpassword,
          };
          changepass(user?.accessToken,newUser,dispatch,axiosJWT)
          console.log(newUser);
        },
      });
    return ( 
       
    <section>
    <form className="infoform" onSubmit={formik.handleSubmit}>
      
      
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
      <label> New password </label>
      <input
        type="password"
        id="newpassword"
        name="newpassword"
        value={formik.values.newpassword}
        onChange={formik.handleChange}
        placeholder="Enter your new password"
      />
      {formik.errors.newpassword && (
        <p className="errorMsg"> {formik.errors.newpassword} </p>
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
  
     );
}
 
export default ChangePass;