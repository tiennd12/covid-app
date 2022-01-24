import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  NavLink,
} from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, queryGetUserInfoByEmail, dataRef } from "../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy } from "@firebase/firestore";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link as MUILink } from "@mui/material";

export const NavBar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

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
        // for (let i = 0; i < userInfo.length; i++) {
        //   if (user.email === userInfo[i].email) {
        //     console.log("I found a matching one");
        //     navigate("/");
        //   } else {
        //     navigate("/register");
        //     console.log("there's no match");
        //   }
        //   break;
        //   // console.log(user.email, userInfo[i].email)
        // }
      //   if (isLoggedIn){
      //   onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {

      //   });
      // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const adminNavigator = (e) => {
    e.preventDefault();
    navigate("/adminpanel");
    setAnchorEl(null);
  };

  const signoutHandler = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/")
        window.location.reload(true);
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
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setUserRole(data.data().assignedRole));
      });
    } else {
      setIsLoggedIn(null);
    }
  });
  // console.log(isLoggedIn);

  //MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        if (snapshot._snapshot.docChanges.length === 0){
          navigate("/register")
          console.log("aaaaaa");
        }
        snapshot.forEach((data) => setUserInfo(data.data()));
      });
    }
  }, [isLoggedIn]);

  return (
    <nav className="container">
      <div className="nav-home">
        <RouterLink to="/">
          <Typography variant="h4" gutterBottom>
            TRA CỨU TÌNH TRẠNG TIÊM CHỦNG COVID-19
          </Typography>
        </RouterLink>
      </div>
      {/* <div>
      <form className="look-form">
        <input
          type="text"
          className="phone-input"
          placeholder="Nhập số điện thoại"
          onChange={inputPhoneHandler}
          value={inputPhone}
        />
        <input
          type="text"
          className="id-input"
          placeholder="Nhập số CMND/CCCD"
          onChange={inputIdHandler}
          value={inputId}
        />
        <button className="submit-button" onClick={submitHandler}>
          Tra cứu
        </button>
      </form>
      </div> */}
      <div>
        {isLoggedIn ? (
          <div>
            {" "}
            {userInfo && (
              <div className="nav-dropdown">
                <Button
                  variant="outlined"
                  color="inherit"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  
                >
                  Xin chào {userInfo?.name}
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <MUILink
                      to="/profile"
                      underline="none"
                      color="inherit"
                      component={RouterLink}
                    >
                      {" "}
                      Thông tin cá nhân
                    </MUILink>{" "}
                  </MenuItem>
                  {userRole === "admin" || userRole === "moderator" ? (
                    <MenuItem onClick={adminNavigator}>Admin Panel</MenuItem>
                  ) : (
                    ""
                  )}
                  <MenuItem onClick={signoutHandler}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Button
              variant="outlined"
              color="inherit"
              id="basic-button"
              className="btn-login"
              onClick={loginHandler}
            >
              Đăng nhập với Google
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
