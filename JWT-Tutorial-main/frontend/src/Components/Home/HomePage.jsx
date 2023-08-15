import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { deleteUserStart } from "../../redux/userSlice";
import { deleteUsersSuccess } from "../../redux/userSlice";
import { deleteUserFailed } from "../../redux/userSlice";
import DataTable from 'react-data-table-component';
import { loginSuccess } from "../../redux/authSlice";
import { getUsersSuccess } from "../../redux/userSlice";
const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
 const [admin,setAdmin]=useState([]);
 const [uninput,setUninput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
      const res = await axiosJWT.delete("/v1/user/" + id, {
        headers: { token: `Bearer ${accessToken}` },
      });
     
      const updatedAdmin = userList.filter((person) => person._id !== id);
       await dispatch(getUsersSuccess(updatedAdmin));
       setAdmin(userList);
    } catch (err) {
      dispatch(deleteUserFailed(err.response.data));
    
    }
  };
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  useEffect(() => {
  setAdmin(userList)
    if (!user) {
        navigate("/login");
      }
      setUninput(false);
     
    if(userList.length===0){
      setUninput(true);
    }
    
  
   
    },[userList]);
 

  function handleFilter (event){
    const newdata =userList.filter(row=>{
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setAdmin(newdata)
}
  const columns = [
    { name: 'ID', selector: '_id' },
    { name: 'Tên', selector: 'username' },
    { name: 'Email', selector: 'email' },
    {
      name: 'Điều chỉnh',
      cell: (row) => (
        <div>
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
    <DataTable columns={columns} data={admin} pagination />
  </div>
  );
};

export default HomePage;
