import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { onSnapshot, setDoc, doc, deleteDoc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  queryGetUserInfoByEmail,
  dataRef,
  db,
  injectionRef,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Link as MUILink } from "@mui/material";

const AdminPanel = () => {
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setUserRole(data.data().assignedRole));
      });
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
  }, []);

  return (
    <div className="container">
      {userRole === "admin" || userRole === "moderator" ? (
        <div>
          <Stack spacing={2} direction="row" className="addInfo-button">
            <div>
              <Button variant="contained">
                {" "}
                <MUILink
                  to="/addinfo"
                  underline="none"
                  color="inherit"
                  component={RouterLink}
                >
                  Chỉnh sửa thông tin tiêm chủng
                </MUILink>
              </Button>
            </div>
            <div>
              <Button variant="contained">
                {" "}
                <MUILink
                  to="/addrole"
                  underline="none"
                  color="inherit"
                  component={RouterLink}
                >
                  Thay đổi phân quyền
                </MUILink>{" "}
              </Button>
            </div>
          </Stack>
          <Stack spacing={2} direction="row" className="addInfo-button">
          <Button variant="contained">
                {" "}
                <MUILink
                  to="/addinjectioninfo"
                  underline="none"
                  color="inherit"
                  component={RouterLink}
                >
                  Chỉnh sửa thông tin lây nhiễm
                </MUILink>{" "}
              </Button>
          </Stack>
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            Bạn không đủ quyền hạn để truy cập
          </Typography>
          <div>
            <Button variant="contained"><MUILink
                  to="/"
                  underline="none"
                  color="inherit"
                  component={RouterLink}
                >
                  Quay lại trang chủ
                </MUILink></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
