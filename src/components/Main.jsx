import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, queryGetUserInfoByEmail, dataRef } from "../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy } from "@firebase/firestore";

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const user = result.user;
        console.log(userInfo);
        for (let i = 0; i < userInfo.length; i++) {
          if (user.email === userInfo[i].email) {
            console.log("I found a matching one");
            navigate("/");
          } else {
            navigate("/register");
            console.log("there's no match");
          }
          break;
          // console.log(user.email, userInfo[i].email)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signoutHandler = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  // firebase
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(currentUser);
      setUserEmail(currentUser.email);
    } else {
      setIsLoggedIn(null);
    }
  });
  // console.log(isLoggedIn);

  useEffect(() => {
    onSnapshot(dataRef, orderBy("name", "desc"), (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUserInfo(users);
    });

    if (isLoggedIn) {
      onSnapshot(queryGetUserInfoByEmail(isLoggedIn.email), (snapshot) => {
        snapshot.forEach((data) => setUserInfo(data.data()));
      });
    }
  }, [isLoggedIn]);


  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div>{userInfo && <h1> Xin chào {userInfo?.name}</h1>}</div>
          <div>Để yêu cầu thay đổi thông tin, vui lòng bấm <Link to="/requestchange">vào đây</Link></div>
          <div>
            <button className="btn-logout" onClick={signoutHandler}>
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <p>
          <button className="btn-login" onClick={loginHandler}>
            Đăng nhập với Google
          </button>
        </p>
      )}
    </div>
  );
};
