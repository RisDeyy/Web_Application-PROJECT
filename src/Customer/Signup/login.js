import React from "react";
import './style/login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faCoffee, faEnvelopeOpen, faEnvelopeSquare, faEnvelopesBulk, faKeyboard, faLocation, faLocationDot, faLock, faMap, faMapLocation, faMapLocationDot, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'

function LoginAccount(){
    return(
        <div className="login-form-container">
            <form className="form-input-Inf">
                <h1 className="title">Đăng Nhập</h1>
                <div className="form-group">
                    <label htmlFor="user-name"><FontAwesomeIcon icon={faUser} /></label>
                    <input id="user-name" type="text" placeholder="Email" className="input-Inf" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-password"><FontAwesomeIcon icon={faLock} /></label>
                    <input id="user-password" type="password" placeholder="Mật khẩu" className="input-Inf"required/>
                </div>
                <p id="link">Chưa có tài khoản? <a href="/signup">Đăng ký ngay.</a></p>
            </form>
        </div>
    );
}

export default LoginAccount;

