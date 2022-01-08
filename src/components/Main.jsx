import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, dataRef } from "../firebase/firebase";
import { onSnapshot, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";

export const Main = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState({});

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const user = result.user;
        // ...
        for (let i = 0; i < userInfo.length; i++) {
          if (user.email === userInfo[i].email) {
            // console.log("I found a matching one")
            navigate("/");
          } else {
            navigate("/register");
            // console.log("there's no match")
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

    const getEmail = async () => {
      if(isLoggedIn){
        const email = isLoggedIn.email
        return setUserEmail(email)
      }

    }

  // firebase
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(currentUser);
    } else {
      setIsLoggedIn(null);
    }
  });
  console.log(auth.currentUser);

  const provider = new GoogleAuthProvider();

  if (auth.currentUser) {
    const { uid, photoURL, displayName, accessToken } = auth.currentUser;
  //  console.log(accessToken);
  }



  useEffect(() => {
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUserInfo(users);
    });

    for (let i = 0; i < userInfo.length; i++) {
      if (userEmail === userInfo[i].email){
        setUsername(userInfo[i].name)
        // console.log(username)
        setDoc(doc(db, "userData", userInfo[i].id), {
          ...userInfo[i],
          accessToken: auth.currentUser.accessToken
        })
      }
      break;
    }
    getEmail();


  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* {userInfo &&
            userInfo.map((user) => (
              <div key={user.id}>
                <h1> Xin chào {user.name}</h1>
              </div>
            ))} */}
          <div >
            <h1> Xin chào {username}</h1>
          </div>
          <button className="btn-logout" onClick={signoutHandler}>
            Đăng xuất
          </button>
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
