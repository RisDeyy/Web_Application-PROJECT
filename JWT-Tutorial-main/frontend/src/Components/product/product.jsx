import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from '../../redux/authSlice';
import { allProducts} from "../../redux/apiRequest";
import { saveProduct} from "../../redux/productSlice";
import { productSucces} from "../../redux/productSlice";
const  AccUser = () => {
    
    const user = useSelector((state) => state.auth.login?.currentUser);
    const Product = useSelector((state) => state.product?.allProducts);
    const [pro,setPro] = useState([]);
    const [uninput,setUninput] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
   
    const deleteProduct = async  (accessToken, dispatch, id, axiosJWT) => {
        try {
            const res = await axiosJWT.delete("/menu/product/" + id, {
              headers: { token: `Bearer ${accessToken}` },
            
            });
            const updatedProduct = Product.filter((person) => person._id !== id);
           await dispatch(productSucces(updatedProduct))
            setPro(Product);
          } catch (err) {
            console.log(err);
          
          }
     
      };
      const handleDelete = async (id) => {
        await deleteProduct(user?.accessToken, dispatch, id, axiosJWT);
      };
        const handleEdit = (row) => {
          dispatch(saveProduct(row));
          navigate("/product/update")
            };

    useEffect(() => {
        setPro(Product);
        if (!user) {
            navigate("/login");
          }
          setUninput(false);
         
        if(Product.lenght===0){
          setUninput(true);
        }
        },[Product]);
function handleFilter (event){
    const newdata =Product.filter(row=>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setPro(newdata)
}
const columns = [
  { name: 'Tên sản phẩm', selector: 'name' },
  { name: 'Chi tiết',
  cell: (row) => (
  <div style={{ whiteSpace: 'normal', maxHeight: '100px', overflowY: 'auto' }}>
        {row.details}
      </div>),
  
  },
  
  {name: 'Actions',
  cell:(row)=>{
    
   return (
  
         <div>
        <button onClick={() => handleEdit(row)}>Edit</button>
        <button onClick={() => handleDelete(row._id)}>Delete</button>
      </div>
      
   )
    
  }
    
  },
];
       
      
return (
  <div>
    <input
      type="text"
      placeholder="Search..."
      readOnly={uninput}
      onChange={handleFilter}
    />
    <DataTable columns={columns} data={pro} pagination
  />
  </div>
);
}
 
export default  AccUser;