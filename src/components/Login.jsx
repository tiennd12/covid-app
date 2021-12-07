import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {addDoc, onSnapshot } from "@firebase/firestore";
import { loginRef } from "../firebase/firebase";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const inputUsernameHandler = (e) => {
    setInputUsername(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(inputUsername, inputPassword);

    addDoc(loginRef, {
      username: inputUsername,
      password: inputPassword
    });
    setInputUsername("");
    setInputPassword("");
  };

  useEffect(() => {
    onSnapshot(loginRef, (snapshot) => {
      let users = []
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id })
      })
      setUserInfo(users)
    });
  }, []);
 
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
      {userInfo && userInfo.map((user) => (
        <div  key={user.id}>
        <h1> { user.username }</h1>
        </div>
      ))}
    </div>
  );
};

export default Login;
