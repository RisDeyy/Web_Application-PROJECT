import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AllproductSucces } from '../../redux/productSlice';
import axios from "axios";
const UpdateAcc = () => {
  const saveProduct = useSelector((state) => state.product?.saveProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Product = useSelector((state) => state.product?.allProducts);
  const [listImgExtra,setlistImgExtral] = useState('');
  const [name,setName] = useState('');
  const [details,setdetails] = useState('');
  const [category,setcategory] = useState('');
  const [price,setprice] = useState('');
  const [quantity,setquantity] = useState('');
  const [image,setimage] = useState('');
  useEffect(()=>{
    setlistImgExtral(saveProduct.setlistImgExtral)
    setName(saveProduct.name)
    setdetails(saveProduct.details)
    setcategory(saveProduct.category)
    setprice(saveProduct.price)
    setquantity(saveProduct.quantity)
    setimage(saveProduct.image)
  },[])
  const UpdateProduct = async(info,navigate,dispatch) =>{
    try{ 
      const res = await axios.post("/menu/product/update",info)
    const updatedProducts = Product.map(item => {
      if (item._id === saveProduct._id) {
        return {
          ...item,
          details: details,
          category: category,
          name: name,
          price: price,
          quantity: quantity,
          image: image,
          listImgExtra: listImgExtra,
        };
      }
      return item;
    });
    dispatch( AllproductSucces(updatedProducts));
    
    navigate("/product")
    }catch(err){
      console.log(err)
    }
  }
  const handleEdit= (e)=>{
    e.preventDefault();
    const info = {
      _id: saveProduct._id,
      details :details,
      category:category,
      name:name,
      price:price,
      quantity:quantity,
      image:image,
      listImgExtra:listImgExtra,
    };
    UpdateProduct(info,navigate,dispatch);
  }  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
    }
  };  
  
  
    return (
      <section className="register-container">
        <div className="register-title"> Sign up </div>
        <form onSubmit={handleEdit}>
        <label>Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <label>Chi tiết</label>
          <input
            type="text"
            value={details}
            onChange={(e)=>setdetails(e.target.value)}
          />
          <label>Giá</label>
          <input
            type="text"
            value={price}
            onChange={(e)=>setprice(e.target.value)}
          />
          <label>Số lượng</label>
          <input
            type="text"
            value={quantity}
            onChange={(e)=>setquantity(e.target.value)}
          />
         <label>Hình ảnh</label> 
          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
         
          
          <button type="submit" > Create account </button>
        </form>
       
        
         
      </section>
    );
  
}
 
export default UpdateAcc ;