import React, { useState, useEffect } from "react";
import { onSnapshot, setDoc, doc, deleteDoc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  queryGetUserInfoByEmail,
  dataRef,
  db,
  injectionRef,
} from "../firebase/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Typography from "@mui/material/Typography";
import { Link as MUILink } from "@mui/material";

const Profile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [totalUserInfo, setTotalUserInfo] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(currentUser);
    } else {
      setIsLoggedIn(null);
    }
  });

  useEffect(() => {
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });

    if (isLoggedIn) {
      onSnapshot(queryGetUserInfoByEmail(isLoggedIn.email), (snapshot) => {
        snapshot.forEach((data) => {
          setUserInfo(data.data());
        });
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="container profile">
      <div>
        <div>
          <Typography variant="h4" gutterBottom>
            Thông tin cá nhân
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Họ và tên: {userInfo.name}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Số CMND/CCCD: {userInfo.idNumber}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Ngày tháng năm sinh: {userInfo.dob}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Số điện thoại: {userInfo.phone}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {userInfo.email}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Địa chỉ: {userInfo.address}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Phường/Xã: {userInfo.ward}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Quận/Huyện: {userInfo.district}{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Thành phố: {userInfo.city}{" "}
          </Typography>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Để yêu cầu thay đổi thông tin, vui lòng bấm
              <MUILink
                to="/requestchange"
                underline="none"
                color="inherit"
                component={RouterLink}
                sx={{ fontWeight: 'bold', m: 1 }}
              > vào đây
              </MUILink>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
