
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { addCategory } from '../../redux/apiRequest';
const Addcategory = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Image = event.target.result.split(",")[1]; // Lấy phần dữ liệu base64
        const category = {
          name: name,
          image: base64Image,
          listIdProduct: [],
        };
        
        if (user?.accessToken) {
          addCategory(navigate, category, axiosJWT, user?.accessToken);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };
      const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        setSelectedImage(selectedImage);
        setImageURL(imageURL); 
      };
    return ( 
        <div className="main">
        <p className="sign" align="center">
            Cập nhật thông tin Admin
          </p>
           <section >
           <form className="form1" onSubmit={handleAdd}>
             <input
             className="username"
               type="text"
               onChange={(e)=>setName(e.target.value)}
              
             />
             <input type="file" accept="image/*" onChange={handleImageChange} />
                {imageURL && <img src={imageURL} alt="Selected" />}
           
            
             
             <button className="submit" align="center"  type="submit" > Cập nhật </button>  
             <br></br>
           
           </form>
          
           
            
         </section>
         </div>
    );
}
 
export default Addcategory;