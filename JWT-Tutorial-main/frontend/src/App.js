import "./App.css";
import { useState } from "react";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import UpdateInfo from "./Components/UpdateInfo/UpdateInfo";
import Info from "./Components/UpdateInfo/info";
import ChangePass from "./Components/ChangePass/ChangePass";
import AccUser from "./Components/account/account";
import UppAcc from "./Components/account/updateAcc";
import ProductOrder from "./Components/productOrder/productOrder";
import Product from "./Components/product/product";
import UpdatePro from "./Components/product/updatePro";
import AdminHonme from "./Components/adminhome/adminhome";
import { useSelector } from "react-redux";
import { createContext} from "react";
import ReactSwitch from "react-switch";
import { useDispatch} from "react-redux";
import { ThemeSetCus } from "./redux/productSlice";
export const ThemeContext = createContext(null);


function App() {
  const dispatch = useDispatch();
  const themecustem = useSelector((state) => state.product.themecustem);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = themecustem === "dark" ? "light" : "dark";
    dispatch(ThemeSetCus(newTheme));
  };
  const  currentUser = useSelector((state) => state.auth.login.currentUser);
const edit = !currentUser;
  return (
    <ThemeContext.Provider value={{ themecustem, toggleTheme }}>
    <div className="App" id={themecustem}>
    <Router>
     {!edit &&( <NavBar />)}
      <div className="App"> 
        <Routes>
        <Route path="/" element={< AdminHonme />} />
        <Route path="/updateinfo/changepass" element={<ChangePass />} />
        <Route path="/info" element={<Info />} />
        <Route path="/updateinfo" element={<UpdateInfo />} />
          <Route path="/listadmin" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccUser />} />
          <Route path="/account/update" element={< UppAcc />} />
          <Route path="/productOrder" element={<ProductOrder />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/update" element={<UpdatePro />} />
        </Routes>
      </div>
    </Router>
    <div className="switch">
          <label> {themecustem === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={themecustem === "dark"} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
