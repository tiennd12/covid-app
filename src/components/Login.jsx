import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs } from "@firebase/firestore";
import { colRef } from "../firebase/firebase";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [test, setTest] = useState([]);

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

  useEffect(() => {
    console.log("lna ngu vl");
    getDocs(colRef).then((snapshot) => {
      let users = []
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id })
        setTest(users)
        console.log(test, users)
      })
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
      {test && test.map((user) => (
        <div  key={user.id}>
        <h1> { user.name }</h1>
        </div>
      ))}
    </div>
  );
};

export default Login;
