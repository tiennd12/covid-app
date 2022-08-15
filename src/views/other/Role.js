import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, setDoc, doc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  dataRef,
  db,
  injectionRef,
  rolesRef,
} from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  Card,
  CardContent,
  Container,
  Menu,
  Box,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Typography,
  Autocomplete,
  Grid,
} from "@mui/material";

import { AdminContext } from "../../context/adminContext";

import { makeStyles } from "@mui/styles";

import { IconSquareX } from "@tabler/icons";
const AddRole = () => {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [roleSpecify, setRoleSpecify] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [injectionInfo, setInjectionInfo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [autoCompleteVal, setAutocompleteVal] = useState("");
  const [autoCompleteVal1, setAutocompleteVal1] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [roleName, setRoleName] = useState("");

  const [isAddRole, setIsAddRole] = useState(false);
  const [isDeleteRole, setIsDeleteRole] = useState(false);
  const { isAdmin, setIsMod, setIsAdmin, setIsUser } = useContext(AdminContext);
  const navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    header: {
      marginBottom: "30px",
      textTransform: "uppercase",
    },
    textField: {
      margin: "15px 0",
    },
    box: {
      border: "2px solid black",
      borderRadius: "10px",
      boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.4)",
      padding: "20px",
      width: "300px",
      margin: "20px auto",
    },
    icons: {
      cursor: "pointer",
    },
    button: {
      margin: "10px 30px",
    },
  }));

  const classes = useStyles();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setUserRole(data.data().assignedRole));
      });
      if(userRole === 'admin') {
        setIsAdmin(true);
        setIsMod(false);
        setIsUser(false);
      } else if(userRole === 'moderator') {
        setIsAdmin(false);
        setIsMod(true);
        setIsUser(false);
      } else if(userRole === 'user'){
        setIsAdmin(false);
        setIsMod(false);
        setIsUser(true);
      } else {
        setIsAdmin(false);
        setIsMod(false);
        setIsUser(false);
      }
    }
  });

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(dataRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setUserInfo(data.data());
          setUserId(data.id);
          setCurrentRole(data.data().assignedRole);
        });
      });
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setInjectionInfo(data.data());
        });
      });


    }
  };

  const submitInfoHandler = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "userData", userId), {
      ...userInfo,
      assignedRole: role,
      department: roleSpecify,
    }).then(window.alert("Cập nhật thông tin thành công"));
    setRole("");
    setRoleSpecify("");
  };

  const backToMainPagehandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const removeItemAtOnce = (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };

  const addRole = async (e) => {
    e.preventDefault();
    if (roleList.indexOf(roleName) === -1) {
      roleList.push(roleName);
      await setDoc(doc(db, "roleData", "taQPWqV16yQr1NZOkEXM"), {
        roles: roleList,
      })
      .then(window.alert("Tạo thành công"));
    } else {
      window.alert("Đã có role này trên hệ thống");
    }
    setRoleName("");
  };

  const removeRole =  async (e) => {
    e.preventDefault();
    removeItemAtOnce(roleList, autoCompleteVal);

    setDoc(doc(db, "roleData", "taQPWqV16yQr1NZOkEXM"), {
      roles: roleList,
    })
    .then(window.alert("Xóa vai trò thành công"));
    setAutocompleteVal("");
  };

  useEffect(() => {
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
    onSnapshot(rolesRef, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push(...doc.data().roles);
      });
      setRoleList(data);
    });
  }, [userId, userRole, autoCompleteVal]);

  if (!userRole) {
    return <div> Loading </div>;
  }

  return (
    <Container>
      {" "}
      {isAdmin && (
        <Card sx={{ marginBottom: "50px", textAlign: "center" }}>
          {" "}
          {/* Giao diện chỉ admin nhìn thấy */}{" "}
          <CardContent>
            <Grid container>
              <Grid item sm={6}>
                {" "}
                {isAddRole ? (
                  <Box className={classes.box}>
                    <Stack sx={{ alignItems: "flex-end" }}>
                      <IconSquareX
                        className={classes.icons}
                        onClick={() => setIsAddRole(false)}
                      />{" "}
                    </Stack>{" "}
                    <Typography variant="h3"> Tạo vai trò </Typography>{" "}
                    <FormControl>
                      <TextField
                        className={classes.textField}
                        label="tạo role"
                        onChange={(e) => setRoleName(e.target.value)}
                        value={roleName}
                      />{" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={addRole}
                      >
                        {" "}
                        Tạo{" "}
                      </Button>{" "}
                    </FormControl>{" "}
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => setIsAddRole(true)}
                  >
                    {" "}
                    Tạo vai trò{" "}
                  </Button>
                )}{" "}
              </Grid>{" "}
              <Grid item sm={6}>
                {" "}
                {isDeleteRole ? (
                  <Box className={classes.box}>
                    <Stack sx={{ alignItems: "flex-end" }}>
                      <IconSquareX
                        className={classes.icons}
                        onClick={() => setIsDeleteRole(false)}
                      />{" "}
                    </Stack>{" "}
                    <Typography variant="h3"> Xóa vai trò </Typography>{" "}
                    <Autocomplete
                      className={classes.textField}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      disablePortal
                      onChange={(event, value) => setAutocompleteVal(value)}
                      value={autoCompleteVal}
                      id="combo-box-demo"
                      options={roleList}
                      renderInput={(params) => (
                        <TextField {...params} label="Chọn vai trò" />
                      )}
                    />{" "}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={removeRole}
                    >
                      Xóa{" "}
                    </Button>{" "}
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    className={classes.button}
                    onClick={() => setIsDeleteRole(true)}
                  >
                    {" "}
                    Xóa vai trò{" "}
                  </Button>
                )}{" "}
              </Grid>{" "}
            </Grid>{" "}
          </CardContent>{" "}
        </Card>
      )}
      <Card>
        {" "}
        {userRole === "admin" || userRole === "moderator"? (
          userInfo ? (
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h2" className={classes.header} gutterBottom>
                Thông tin người dùng{" "}
              </Typography>{" "}
              <TextField
                className={classes.textField}
                helperText="Họ và tên:"
                value={userInfo.name}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                helperText="Phân quyền:"
                value={userInfo.assignedRole}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                helperText="Vai trò:"
                value={userInfo.department}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
              <div>
                <Stack className="addRole-form">
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                      Phân quyền{" "}
                    </InputLabel>{" "}
                    <Select
                      className="addRole-role"
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                      label={"Phân quyền"}
                      labelId="demo-simple-select-label"
                      id="combo-box-demo"
                    >
                      <MenuItem value="user"> User </MenuItem>{" "}
                      <MenuItem value="moderator"> Moderator </MenuItem>{" "}
                      <MenuItem value="admin"> Admin </MenuItem>{" "}
                    </Select>{" "}
                  </FormControl>{" "}
                </Stack>{" "}
                <Stack className="addRole-form">
                  <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                      Vai trò{" "}
                    </InputLabel>{" "}
                    <Autocomplete
                      className={classes.textField}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      disablePortal
                      onChange={(event, value) => setRoleSpecify(value)}
                      value={roleSpecify}
                      id="combo-box-demo"
                      options={roleList}
                      renderInput={(params) => (
                        <TextField {...params} label="Chọn vai trò" />
                      )}
                    />{" "}
                  </FormControl>{" "}
                </Stack>{" "}
                <Button
                  variant="contained"
                  type="submit"
                  onClick={submitInfoHandler}
                >
                  Gửi{" "}
                </Button>{" "}
              </div>{" "}
            </CardContent>
          ) : (
            <CardContent>
              <form className="addRole-form">
                <Stack spacing={2}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    label="Tìm theo số điện thoại"
                    className="addInfo-findWithPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />{" "}
                  <Button
                    variant="contained"
                    type="sumbit"
                    onClick={findInfoByPhoneHandler}
                  >
                    Tìm{" "}
                  </Button>{" "}
                </Stack>{" "}
              </form>{" "}
            </CardContent>
          )
        ) : (
          <CardContent>
            <div>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "red" }}
              >
                Bạn không đủ quyền hạn để truy cập{" "}
              </Typography>{" "}
            </div>{" "}
            <Button variant="contained" onClick={backToMainPagehandler}>
              Quay lại trang chủ{" "}
            </Button>{" "}
          </CardContent>
        )}{" "}
      </Card>{" "}
    </Container>
  );
};

export default AddRole;
