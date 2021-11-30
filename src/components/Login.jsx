import React from "react";
import { Link } from "react-router-dom";
import Example from "./DatePicker";

const Login = ({
  inputUsername,
  setInputUsername,
  inputPassword,
  setInputPassword,
}) => {
  const inputUsernameHandler = (e) => {
    setInputUsername(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(inputUsername, inputPassword);
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      <form className="login-form">
        <input
          type="text"
          className="login-id"
          placeholder="Email hoặc số điện thoại"
          onChange={inputUsernameHandler}
          value={inputUsername}
        />
        <input
          type="password"
          className="login-password"
          placeholder="Mật khẩu"
          onChange={inputPasswordHandler}
          value={inputPassword}
        />
        <button className="login-button" onClick={loginSubmitHandler}>
          Đăng Nhập
        </button>
      </form>
      <Link to="/register">
      <p>Tạo tài khoản mới</p>
      </Link>
      <Link to="/recover">
        <p>Quên mật khẩu?</p>
      </Link>
    </div>
  );
};

export default Login;
