/*
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./navbar.css";
import { Notification } from "../../redux/apiRequest";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";
import { newNotification } from "../../redux/userSlice";
import socketIOClient from 'socket.io-client';
const NavBar = () => {
  const notification = useSelector((state) => state.users?.notification);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((state)=> state.auth.login?.currentUser);
  const newNoti = useSelector((state) => state.users?.newNotification);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SERVER_ENDPOINT = 'http://localhost:8000';
  let axiosJWT = createAxios(user,dispatch,logOutSuccess);

 
  useEffect(() => {
    const socket = socketIOClient(SERVER_ENDPOINT);

    // Lắng nghe sự kiện "notification" từ máy chủ
    socket.on('notification', (data) => {
      // Cập nhật danh sách thông báo khi có dữ liệu mới hoặc cập nhật
     
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      dispatch(newNotification(notifications))
      Notification(dispatch);
    });
   
    // Thoát khỏi kết nối socket khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken,axiosJWT);
   
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span>  {user.username} </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {
notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

*/
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Notification } from "../../redux/apiRequest";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";
import { newNotification } from "../../redux/userSlice";
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import *  as PiIcons from 'react-icons/pi'
import * as RiIcons from 'react-icons/ri'
import "./Nav.css"


const NavBar = () => {
  const notification = useSelector((state) => state.users?.notification);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((state)=> state.auth.login?.currentUser);
  const newNoti = useSelector((state) => state.users?.newNotification);
  const [count,setCount] = useState([])
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const SERVER_ENDPOINT = 'http://localhost:8000';
  let axiosJWT = createAxios(user,dispatch,logOutSuccess);

 
  useEffect(() => {
    
    const socket = socketIOClient(SERVER_ENDPOINT);

    // Lắng nghe sự kiện "notification" từ máy chủ
    socket.on('notification', (data) => {
      // Cập nhật danh sách thông báo khi có dữ liệu mới hoặc cập nhật
      if (data !== undefined) {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
        setCount((prevNotifications) => [data, ...prevNotifications]);
        dispatch(newNotification(notifications));
      }
     
    });
   
    // Thoát khỏi kết nối socket khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken,axiosJWT);
   
  }
  const handleRead = () => {
    setCount([]);
  };
  return (
   
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Dropdown onClick={handleRead}>
      <Dropdown.Toggle  id="dropdown-basic" >
      <RiIcons.RiNotification2Fill/>
      </Dropdown.Toggle>
      {count.length >0 &&
            <div className="counter">{count.length}</div>
          }
      <Dropdown.Menu>
      {newNoti && newNoti.map(newnoti => (
  <div key={newnoti.id}>
    <p>{newnoti.title}</p>
    <p>{newnoti.content}</p>
    <p><span>vào lúc</span> {newnoti.updatedAt}</p>
  </div>
))}
         <NavDropdown.Divider />
         {notification.map(noti => (
          <div key={noti._id}>
            <p>{noti.title}</p>
            <p>{noti.content}</p>
            <p><span>vào lúc</span> {noti.combinedTime}</p>
          </div>
        ))}
        
      </Dropdown.Menu>
    </Dropdown>
    
    <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
      <PiIcons.PiFinnTheHumanFill/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <div>
                <Link to="/info" > Thông tin admin</Link>
                </div>
                <div>
                <Link to="/updateinfo" > Cập nhật tài khoản</Link>
                </div>
              <div>
                <Link to="/listadmin" > Danh sách admin</Link>
                </div>

                <div>
                <Link to="/register" > Đăng ký tài khoản admin</Link>
                </div>
              <NavDropdown.Divider />
              
                <div>
              <Link to="/logout" onClick={handleLogout}> Đăng xuất</Link>
              </div>
              
        
      </Dropdown.Menu>
    </Dropdown>

      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' >
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars' onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} onClick={showSidebar}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  </>
  )
}

export default NavBar;