import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  auth,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  queryGetUserInfoById,
  injectionRef,
  dataRef,
} from "../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy } from "@firebase/firestore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { typography } from "@mui/system";

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [injectionInfoQuery, setInjectionInfoQuery] = useState("");
  const [injectionIdQuery, setInjectionIdQuery] = useState("");
  const [userInfoQuery, setUserInfoQuery] = useState("");
  const [userIdQuery, setUserIdQuery] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const [queryId, setQueryId] = useState("");

  // firebase
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(currentUser);
      setUserEmail(currentUser.email);
    } else {
      setIsLoggedIn(null);
    }
  });

  // query data
  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();
    if (queryPhone) {
      onSnapshot(
        queryGetUserInfoByPhone(injectionRef, queryPhone),
        (snapshot) => {
          console.log(snapshot._snapshot.docChanges.length);
          if (snapshot._snapshot.docChanges.length === 0) {
            window.alert("Không tìm thấy dữ liệu người dùng");
          }

          snapshot.forEach((data) => {
            setInjectionInfoQuery(data.data());
            setInjectionIdQuery(data.id);
          });
        }
      );
      onSnapshot(queryGetUserInfoByPhone(dataRef, queryPhone), (snapshot) => {
        snapshot.forEach((data) => {
          // console.log(data.data().phone);
          setUserInfoQuery(data.data());
          setUserIdQuery(data.id);
        });
      });
    }
    if (queryId) {
      onSnapshot(queryGetUserInfoById(injectionRef, queryId), (snapshot) => {
        console.log(snapshot);
        if (snapshot._snapshot.docChanges.length === 0) {
          window.alert("Không tìm thấy dữ liệu người dùng");
          setUserInfoQuery("");
        }

        snapshot.forEach((data) => {
          setInjectionInfoQuery(data.data());
          setInjectionIdQuery(data.id);
        });
      });
      onSnapshot(queryGetUserInfoById(dataRef, queryId), (snapshot) => {
        snapshot.forEach((data) => {
          // console.log(data.data().phone);
          setUserInfoQuery(data.data());
          setUserIdQuery(data.id);
        });
      });
    }
    console.log(userInfoQuery);
  };

  const goBackHandler = (e) => {
    e.preventDefault();
    setUserInfoQuery("");
  };

  //-----------------

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
        snapshot.forEach((data) => {
          setUserInfo(data.data());
          setPhone(data.data().phone);
        });
      });
    }
    if (phone) {
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setInjectionInfo(data.data());
          setInjectionId(data.id);
        });
      });
    }
  }, [isLoggedIn, phone, queryId]);

  return (
    <div className="container main">
      {isLoggedIn ? (
        <div>
          {injectionInfo.numberOfInjections ? (
            <div>
              <div>
                {injectionInfo && (
                  <div>
                    {injectionInfo.numberOfInjections === null ? (
                      <Typography variant="h4" gutterBottom>
                        {" "}
                        Chưa có dữ liệu tiêm chủng của bạn
                      </Typography>
                    ) : (
                      <Typography variant="h4" gutterBottom>
                        {" "}
                        Bạn đã tiêm {injectionInfo?.numberOfInjections} vaccine
                      </Typography>
                    )}
                    <div className="main-info">
                      <Stack
                        spacing={2}
                        direction="column"
                        sx={{ maxWidth: 400, alignItems: "center" }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          Mũi số 1: {injectionInfo?.firstDose} -{" "}
                          {injectionInfo?.injectDate1} - Đơn vị tiêm:{" "}
                          {injectionInfo?.injectPerson1}
                        </Typography>
                        {injectionInfo.secondDose === null ||
                        injectionInfo.secondDose === "Chưa tiêm" ? (
                          ""
                        ) : (
                          <Typography variant="subtitle1" gutterBottom>
                            Mũi số 2: {injectionInfo?.secondDose}-{" "}
                            {injectionInfo?.injectDate2} - Đơn vị tiêm:{" "}
                            {injectionInfo?.injectPerson2}
                          </Typography>
                        )}
                        {injectionInfo.thirdDose === null ||
                        injectionInfo.thirdDose === "Chưa tiêm" ? (
                          ""
                        ) : (
                          <Typography variant="subtitle1" gutterBottom>
                            Mũi số 3: {injectionInfo?.thirdDose} -{" "}
                            {injectionInfo?.injectDate3} - Đơn vị tiêm:{" "}
                            {injectionInfo?.injectPerson3}
                          </Typography>
                        )}
                      </Stack>
                    </div>
                    <div>---------------------------------</div>
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Lịch sử lây nhiễm
                      </Typography>
                      {injectionInfo.infectedTimes === "" ? (
                        <div>
                          <Typography variant="subtitle1" gutterBottom>
                            <em>Bạn chưa từng nhiễm bệnh</em>
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <div>
                            {injectionInfo.infectedNote1 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2}>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ngày nhiễm bệnh lần 1:{" "}
                                  {injectionInfo.injectDate1} {""}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ghi chú: {injectionInfo.infectedNote1}
                                </Typography>
                              </Stack>
                            )}
                          </div>
                          <div>
                            {injectionInfo.infectedNote2 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2}>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ngày nhiễm bệnh lần 2:{" "}
                                  {injectionInfo.injectDate2} {""}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ghi chú: {injectionInfo.infectedNote2}
                                </Typography>
                              </Stack>
                            )}
                          </div>
                          <div>
                            {injectionInfo.infectedNote3 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2}>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ngày nhiễm bệnh lần 3:{" "}
                                  {injectionInfo.injectDate3} {""}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                  Ghi chú: {injectionInfo.infectedNote3}
                                </Typography>
                              </Stack>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>---------------------------------</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <Typography variant="h5" gutterBottom>
                Bạn chưa có thông tin tiêm chủng
              </Typography>
            </div>
          )}
          <div>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 5 }}>
              Kiểm tra thông tin của người khác
            </Typography>{" "}
          </div>
          {userInfoQuery ? (
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Họ và tên: {userInfoQuery?.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Ngày sinh: {userInfoQuery?.dob}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Tình trạng tiêm chủng: Đã tiêm{" "}
                {injectionInfoQuery?.numberOfInjections}
              </Typography>
              <Button variant="contained" id="test" onClick={goBackHandler}>
                Quay lại
              </Button>
            </div>
          ) : (
            <div>
              {" "}
              <div className="addRole-form">
                <Stack spacing={2}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    label="Tìm theo số điện thoại"
                    className="addInfo-findWithPhone"
                    value={queryPhone}
                    onChange={(e) => setQueryPhone(e.target.value)}
                  />
                  <Typography variant="h6" gutterBottom>
                    Hoặc
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    label="Tìm theo CMND/CCCD"
                    className="addInfo-findWithId"
                    value={queryId}
                    onChange={(e) => setQueryId(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    type="sumbit"
                    onClick={findInfoByPhoneHandler}
                  >
                    Tìm
                  </Button>
                </Stack>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Typography variant="h5" gutterBottom>
          Vui lòng đăng nhập để tiếp tục
        </Typography>
      )}
    </div>
  );
};
