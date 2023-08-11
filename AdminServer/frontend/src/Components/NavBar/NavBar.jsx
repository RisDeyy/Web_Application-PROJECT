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

/*
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