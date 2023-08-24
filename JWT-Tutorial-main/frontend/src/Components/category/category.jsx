import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCategory } from '../../redux/categorySlice';
import { SaveCategory } from '../../redux/categorySlice';
import { AllproductSucces } from '../../redux/productSlice';
import axios from "axios";
import { allProducts } from '../../redux/apiRequest';
const Category = () => {
    const [cate,setCate] = useState([]);
    const [uninput,setUninput] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allcategory = useSelector((state) => state.category?.allcategory);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const Product = useSelector((state) => state.product?.allProducts);

   const deleteCategary = async  ( dispatch, id) => {
  
      try {
        const res = await axios.delete("/menu/category/" + id)
        const updatedCate = allcategory.filter((category) => category._id !== id);
       await dispatch(GetCategory(updatedCate))
        setCate(allcategory);
        await allProducts(dispatch);
      } catch (err) {
        console.log(err);
      
      }
    };
    const deleteProductCategary = async (dispatch, idcate, idpro) => {
      try {
        await axios.delete("/menu/categoryproduct/" + idpro);
    
        const updatedCategory =  allcategory.map((category) => {
          if (category._id === idcate) {
            const updatedListIdProduct =  category.listIdProduct.filter(
              (categoryPro) => categoryPro._id !== idpro
            );
            return { ...category, listIdProduct: updatedListIdProduct };
          }
          return category;
        });
       const updatedProduct = Product.map((product)=>{
        if(product._id === idpro){
         
          return {...product , categoy:"Trống" }
        }
        return product;
       })
        await dispatch(GetCategory(updatedCategory));
        setCate(updatedCategory);
       await dispatch(AllproductSucces(updatedProduct))
      } catch (err) {
        console.log(err);
      }
    };
    
    const handleDelete = async (id) => {
      await deleteCategary( dispatch, id);
    };
    const handleDeleteProduct = async (idcate,idpro) => {
      await deleteProductCategary( dispatch, idcate,idpro);
    };
    const handleEdit = (row) => {
      dispatch(SaveCategory(row));
      navigate("/category/update")
        };


    useEffect(() => {
      console.log()
        setCate(allcategory);
        if (!user) {
            navigate("/login");
          }
          setUninput(false);
         
        if(allcategory.length===0){
          setUninput(true);
        }
        
      
       
        },[allcategory]);
        
function handleFilter (event){
    const newdata =allcategory.filter(row=>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
     setCate(newdata)
}

const columns = [
    { name: 'Name', selector: 'name' },
   
    {
      name: 'Cart',
      cell: (row) => (
         
          <div>
          {row.listIdProduct.map((listIdProduct) => (
            <div key={listIdProduct._id}>
              <div>{listIdProduct.name}</div>
              <div>{listIdProduct.quantity}</div>
              <img src={listIdProduct.image} alt="Product Image" />
              <div>{listIdProduct.price} </div>
              <button onClick={() => handleDeleteProduct(row._id,listIdProduct._id)}>Delete</button>
            </div>
             
          ))}
        </div>

        
      ),
    },
    {
     
        name: 'Actions',
        cell: (row) => (
          <div>
            <button onClick={() => handleEdit(row)}>Edit</button>
            <button onClick={() => handleDelete(row._id)}>Delete</button>
          </div>
        ),
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
    <DataTable columns={columns} data={allcategory} pagination />
  </div>
);
}
 
export default  Category;