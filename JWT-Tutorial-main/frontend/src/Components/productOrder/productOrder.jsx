import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const  AccUser = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const product = useSelector((state) => state.product?.product);
    const [pro,setPro] = useState([]);
    const [Pending,setPending] = useState(false);
    const [uninput,setUninput] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleYes = async (row) => {
        try {
          await axios.delete("/menu/product/checkoutyes/" + row._id);
          const updatedPro = pro.map(item => {
            if (item._id === row._id) {
              return { ...item, status: "Delivering" };
            }
            return item;
          });
          setPro(updatedPro);
        } catch (err) {
          console.log(row._id)
        }
      };
      
      const handleNo = async (row) => {
        try {
          await axios.delete("/menu/product/checkoutno/" + row._id);
          const updatedPro = pro.map(item => {
            if (item._id === row._id) {
              return { ...item, status: "Canceled" };
            }
            return item;
          });
          setPro(updatedPro);
        } catch (err) {
          
        }
      };
      

    useEffect(() => {
        setPro(product);
        
        if (!user) {
            navigate("/login");
          }
          setUninput(false);
         
        if(product.length===0){
          setUninput(true);
        }
        },[product]);
function handleFilter (event){
    const newdata =product.filter(row=>{
        return row.numberPhone.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setPro(newdata)
}
const columns = [
  { name: 'Name', selector: 'name' },
  { name: 'Phone', selector: 'numberPhone' },
  { name: 'Address', selector: 'address' },
 
  {
    name: 'Cart',
    cell: (row) => (
       
        <div>
        {row.products.map((product) => (
          <div key={product.id}>
            <div>{product.name}</div>
            <div>{product.quantity}</div>
            <img src={product.image} alt="Product Image" />
            <div>{product.unitPrice} </div>
          </div>
        ))}
      </div>
      
    ),
  },
  {
    name:'Total',
    cell: (row) => {
        const total = row.products.reduce((acc, product) => acc + product.unitPrice, 0);
        row.totalPrice = total; 
        return (
          <span>{total}</span>
        );
      }
      
  },
  {name :'Time',selector:'time'},
  {name:'Status',selector:'status'},
  {name: 'Actions',
  cell:(row)=>{
    if(row.status==="Pending" ){
   return (
   <div>
        <button onClick={() => handleYes(row)}>Yes</button>
        <button onClick={() => handleNo(row)}>No</button>
      </div>
   )
    }
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
    <DataTable columns={columns} data={pro} pagination={true}
     autoWidth={true}
  responsive={true}
  columnWidths={true} 
  noHeader={true}
  
  />
  </div>
);
}
 
export default  AccUser;