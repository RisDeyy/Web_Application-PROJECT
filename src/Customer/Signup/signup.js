import React from "react";
import './style/signup.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faCoffee, faEnvelopeOpen, faEnvelopeSquare, faEnvelopesBulk, faKeyboard, faLocation, faLocationDot, faLock, faMap, faMapLocation, faMapLocationDot, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'

function RegisterAccount(){
    return(
        <div className="register-form-container">
            <form className="form-input-Inf">
                <h1 className="title">Đăng Ký Tài Khoản</h1>
                <div className="form-group">
                    <label htmlFor="user-name"><FontAwesomeIcon icon={faUser} /></label>
                    <input id="user-name" type="text" placeholder="Tên người dùng" className="input-Inf" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-email"><FontAwesomeIcon icon={faEnvelopeSquare} /></label>
                    <input id="user-email" type="text" placeholder="Email" className="input-Inf"required/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-adress"><FontAwesomeIcon icon={faLocationDot} /></label>
                    <input id="user-adress" type="text" placeholder="Địa chỉ" className="input-Inf"required/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-password"><FontAwesomeIcon icon={faLock} /></label>
                    <input id="user-password" type="password" placeholder="Mật khẩu" className="input-Inf"required/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-comfirm-password"><FontAwesomeIcon icon={faLock} /></label>
                    <input id="user-repassword" type="password" placeholder="Xác nhận mật khẩu" className="input-Inf"required/>
                </div>
                <div>
                    <input type="submit" value="Đăng Ký" id="form-submit"/>
                </div>
                <p id="link">
                    Đã có tài khoản? 
                    <a href="/login"> Đăng nhập</a>.
                </p>
            </form>
        </div>
    );
}

export default RegisterAccount;

