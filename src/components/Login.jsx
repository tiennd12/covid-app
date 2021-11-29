import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Đăng nhập</h1>
      <form className="login-form">
        <input
          type="text"
          className="login-id"
          placeholder="Email hoặc số điện thoại"
        />
        <input type="text" className="login-password" placeholder="Mật khẩu" />
        <button className="login-button">Đăng Nhập</button>
      </form>
      <p>Tạo tài khoản mới</p>
      <p>Quên mật khẩu?</p>
    </div>
  );
};

export default Login;
