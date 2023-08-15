import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount} from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import {deleteAccfalse} from "../../redux/userSlice";
import { Account } from "../../redux/userSlice";
import { allAcc } from '../../redux/userSlice';
import { createAxios } from "../../createInstance";
const  AccUser = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const allaccount = useSelector((state) => state.users?.allaccount);
    const deleteAcc = useSelector((state)=> state.users.deleteAcc)
    const [acc,setAcc] = useState([]);
    const [uninput,setUninput] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const deleteAccount = async  (accessToken, dispatch, id, axiosJWT) => {
  
      try {
        const res = await axiosJWT.delete("/v1/user/account/" + id, {
          headers: { token: `Bearer ${accessToken}` },
        
        });
        const updatedAccounts = allaccount.filter((person) => person._id !== id);
       await dispatch(allAcc(updatedAccounts))
        setAcc(allaccount);
      } catch (err) {
        console.log(err);
      
      }
    };
    const handleDelete = async (id) => {
      await deleteAccount(user?.accessToken, dispatch, id, axiosJWT);
    };
      const handleEdit = (row) => {
        dispatch(Account(row));
        navigate("/account/update")
          };

    useEffect(() => {
        setAcc(allaccount);
        if (!user) {
            navigate("/login");
          }
          setUninput(false);
         
        if(allaccount.length===0){
          setUninput(true);
        }
        
      
       
        },[allaccount]);
function handleFilter (event){
    const newdata =allaccount.filter(row=>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setAcc(newdata)
}
const columns = [
  { name: 'idShoppingCart', selector: 'idShoppingCart' },
  { name: 'Name', selector: 'name' },
  { name: 'Email', selector: 'email' },
  { name: 'Address', selector: 'address' },
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
    <DataTable columns={columns} data={acc} pagination />
  </div>
);
}
 
export default  AccUser;