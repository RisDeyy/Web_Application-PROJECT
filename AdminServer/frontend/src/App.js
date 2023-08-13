import "./App.css";
import { useState } from "react";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import UpdateInfo from "./Components/UpdateInfo/UpdateInfo";
import ChangePass from "./Components/ChangePass/ChangePass";
import { useSelector } from "react-redux";




function App() {

  const  currentUser = useSelector((state) => state.auth.login.currentUser);
const edit = !currentUser;
  return (
    
    <Router>
     {!edit &&( <NavBar />)}
      <div className="App"> 
        <Routes>
        <Route path="/updateinfo/changepass" element={<ChangePass />} />
        <Route path="/updateinfo" element={<UpdateInfo />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
