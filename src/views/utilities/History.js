import React, { useState, useEffect } from "react";


import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  selfDeclareRef,
} from "../../firebase/firebase";

import { onSnapshot, doc, setDoc, orderBy, getDocs } from "@firebase/firestore";
import { Typography, Container, Stack, Card, CardContent, Box, Grid, Button, TextField } from "@mui/material";

import { Link as MUILink } from "@mui/material";

import axios from "axios";

const History = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  //injectionRef
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");
  //selfDeclareRef
  const [declareRefInfo, setDeclareRefInfo] = useState(null);
  const [declareRefId, setDeclareRefId] = useState("");
  //================
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  const [injectionInfoQuery, setInjectionInfoQuery] = useState("");
  const [injectionIdQuery, setInjectionIdQuery] = useState("");
  const [userInfoQuery, setUserInfoQuery] = useState("");
  const [userIdQuery, setUserIdQuery] = useState("");
  const [queryPhone, setQueryPhone] = useState("");
  const [queryId, setQueryId] = useState("");

  const [cases, setCases] = useState([]);
  const [location, setLocation] = useState("");
  const [todayCases, setTodayCases] = useState("");

  // query dataa
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
  };

  const goBackHandler = (e) => {
    e.preventDefault();
    setUserInfoQuery("");
  };

  //axios
  const fetchCases = async () => {
    const { data } = await axios.post(
      `https://static.pipezero.com/covid/data.json`
    );
    setCases(data.locations);
  };

  const getLocalCases = () => {
    setTodayCases(cases[authInfo.districtId].casesToday);
    setLocation(cases[authInfo.districtId].name);
  };

  // `date` is a `Date` object
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const d = new Date();
  d.setDate(d.getDate() + 2);
  // Example

  useEffect(() => {
    fetchCases();
    // firebase
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(currentUser);
        setUserEmail(currentUser.email);
      } else {
        setIsLoggedIn(null);
      }
    });


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
          setAuthInfo(data.data());
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
      onSnapshot(queryGetUserInfoByPhone(selfDeclareRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setDeclareRefInfo(data.data());
          setDeclareRefId(data.id);
        });
      });
    }
  }, [isLoggedIn, phone, queryId]);

  useEffect(() => {
    if (cases.length && authInfo) {
      getLocalCases();
    }
  }, [cases, authInfo]);

  return (
    <Container className="container main">
      {isLoggedIn ? (
        <Card>
          {injectionInfo.numberOfInjections ? (
            <CardContent>
              {injectionInfo && (
                <Stack>
                  <Typography variant="h2" sx={{ textAlign: 'center', textTransform: 'uppercase' }} gutterBottom>
                    Lịch sử lây nhiễm
                  </Typography>
                  {injectionInfo.infectedTimes === "" ? (
                    <Stack>
                      <Typography variant="subtitle1" gutterBottom>
                        <em>Bạn chưa từng nhiễm bệnh</em>
                      </Typography>
                      <Grid container>
                        <Grid item>
                          <Typography variant="subtitle1" gutterBottom>
                            Để yêu cầu thay đổi thông tin, vui lòng bấm
                            <MUILink
                              to="/utils/self-declare"
                              underline="none"
                              color="inherit"
                              component={RouterLink}
                              sx={{ fontWeight: 'bold', m: 1 }}
                            >
                              <Button variant="outlined" color="error">vào đây</Button>
                            </MUILink>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  ) : (
                    <Stack>
                      {injectionInfo?.verifiedByAdmin ? (
                        <Stack>
                          <Typography variant="h3" sx={{ color: 'green', marginBottom: 3 }}>Xác thực bởi người quản trị</Typography>
                          <Stack>
                            {injectionInfo?.infectedDate1 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText=" Ngày nhiễm bệnh lần 1:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.infectedDate1}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ngày khỏi bệnh:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.curedDate1}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ghi chú:"
                                  variant="outlined"
                                  type="text"
                                  className="register-dob"
                                  value={injectionInfo?.infectedNote1}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Stack>
                            )}
                          </Stack>
                          <Stack>
                            {injectionInfo?.infectedDate2 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText=" Ngày nhiễm bệnh lần 2:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.infectedDate2}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ngày khỏi bệnh:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.curedDate2}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ghi chú:"
                                  variant="outlined"
                                  type="text"
                                  className="register-dob"
                                  value={injectionInfo?.infectedNote2}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Stack>
                            )}
                          </Stack>
                          <Stack>
                            {injectionInfo?.infectedDate3 === "" ? (
                              ""
                            ) : (
                              <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText=" Ngày nhiễm bệnh lần 3:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.infectedDate3}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ngày khỏi bệnh:"
                                  variant="outlined"
                                  type="date"
                                  className="register-dob"
                                  value={injectionInfo?.curedDate3}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                  sx={{ marginTop: 1, minWidth: 210 }}
                                  helperText="Ghi chú:"
                                  variant="outlined"
                                  type="text"
                                  className="register-dob"
                                  value={injectionInfo?.infectedNote3}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack>
                          <Stack marginBottom={3}>
                            <Typography variant="h3" sx={{ color: 'red', marginBottom: 3 }}>*Người dùng tự khai báo</Typography>
                            <Stack>
                              {injectionInfo?.infectedDate1 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                  
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText=" Ngày nhiễm bệnh lần 1:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.infectedDate1}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ngày khỏi bệnh:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.curedDate1}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ghi chú:"
                                    variant="outlined"
                                    type="text"
                                    className="register-dob"
                                    value={injectionInfo?.infectedNote1}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </Stack>
                              )}
                            </Stack>
                            <Stack>
                              {injectionInfo?.infectedDate2 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                  
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText=" Ngày nhiễm bệnh lần 2:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.infectedDate2}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ngày khỏi bệnh:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.curedDate2}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ghi chú:"
                                    variant="outlined"
                                    type="text"
                                    className="register-dob"
                                    value={injectionInfo?.infectedNote2}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </Stack>
                              )}
                            </Stack>
                            <Stack>
                              {injectionInfo?.infectedDate3 === "" ? (
                                ""
                              ) : (
                                <Stack spacing={2} sx={{ marginBottom: 5 }}>
                                  
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText=" Ngày nhiễm bệnh lần 3:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.infectedDate3}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ngày khỏi bệnh:"
                                    variant="outlined"
                                    type="date"
                                    className="register-dob"
                                    value={injectionInfo?.curedDate3}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                  <TextField
                                    sx={{ marginTop: 1, minWidth: 210 }}
                                    helperText="Ghi chú:"
                                    variant="outlined"
                                    type="text"
                                    className="register-dob"
                                    value={injectionInfo?.infectedNote3}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </Stack>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      )}
                      <Grid container>
                        <Grid item>
                          <Typography variant="subtitle1" gutterBottom>
                            Để yêu cầu thay đổi thông tin, vui lòng bấm
                            <MUILink
                              to="/utils/self-declare"
                              underline="none"
                              color="inherit"
                              component={RouterLink}
                              sx={{ fontWeight: 'bold', m: 1 }}
                            >
                              <Button variant="outlined" color="error">vào đây</Button>
                            </MUILink>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  )}
                </Stack>
              )}
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                Bạn chưa có thông tin tiêm chủng
              </Typography>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    Để yêu cầu thay đổi thông tin, vui lòng bấm
                    <MUILink
                      to="/utils/self-declare"
                      underline="none"
                      color="inherit"
                      component={RouterLink}
                      sx={{ fontWeight: 'bold', m: 1 }}
                    >
                      <Button variant="outlined" color="error">vào đây</Button>
                    </MUILink>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      ) : (
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Vui lòng đăng nhập để tiếp tục
        </Typography>
      )}
    </Container>
  );
};

export default History;
