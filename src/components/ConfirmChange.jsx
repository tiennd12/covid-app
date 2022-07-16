import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  db,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  dataRef,
  injectionRequestRef,
  storage,
  injectionRef,
} from "../firebase/firebase";
import { onSnapshot, doc, setDoc, orderBy, addDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';

export const ConfirmChange = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [authInfo, setAuthInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [requestInfo, setRequestInfo] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [requestUsers, setRequestUsers] = useState("");
  const [userId, setUserId] = useState(null);

  const [injectInfo, setInjectInfo] = useState("");
  const [injectId, setInjectId] = useState("");

  //inject info
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");

  const [vaccineType1, setVaccineType1] = useState("");
  const [vaccineType2, setVaccineType2] = useState("");
  const [vaccineType3, setVaccineType3] = useState("");

  const [injectDate1, setInjectDate1] = useState("");
  const [injectDate2, setInjectDate2] = useState("");
  const [injectDate3, setInjectDate3] = useState("");

  const [injectPerson1, setInjectPerson1] = useState("");
  const [injectPerson2, setInjectPerson2] = useState("");
  const [injectPerson3, setInjectPerson3] = useState("");

  // upload img
  const [imageUpload, setImageUpload] = useState(null);

  // open dialogue

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setDoc(doc(db, "injectionData", injectId), {
        ...injectInfo,
        numberOfInjections :requestInfo?.numberOfInjections,
        firstDose: requestInfo?.firstDose,
        secondDose: requestInfo?.secondDose,
        thirdDose: requestInfo?.thirdDose,
        injectDate1: requestInfo?.injectDate1,
        injectDate2: requestInfo?.injectDate2,
        injectDate3: requestInfo?.injectDate3,
        injectPerson1:requestInfo?.injectPerson1,
        injectPerson2:requestInfo?.injectPerson2,
        injectPerson3:requestInfo?.injectPerson3,
      });
      setDoc(doc(db, "injectionRequestData", requestId), {
        ...requestInfo,
        status: "approved",
    })
    setOpen(false);
  };
  const handleCloseReject = (e) => {
    e.preventDefault();
    setDoc(doc(db, "injectionRequestData", requestId), {
        ...requestInfo,
        status: "rejected",
        reason,
    })
    setOpen(false);
  };
  const handleClose = (e) => {
    
    setOpen(false);
  };

  //functions

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      onSnapshot(
        queryGetUserInfoByPhone(injectionRequestRef, phone),
        (snapshot) => {
          console.log(snapshot._snapshot.docChanges.length);
          //   if (snapshot._snapshot.docChanges.length === 0) {
          //     window.alert("Không có thông tin cho người dùng này");
          //   } else
          {
            snapshot.forEach((data) => {
              setRequestInfo(data.data());
              setRequestId(data.id);
            });
          }
        }
      );
      onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
        snapshot.forEach((data) => {
          setInjectInfo(data.data());
          setInjectId(data.id);
          // setUserIdNumber(data.data().idNumber);
        });
      });
    }
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
          setAuthInfo(data.data());
          setUserId(data.id);
          setUserRole(data.data().assignedRole);
        });
      });
    }
    console.log(reason);
  }, [isLoggedIn, requestInfo, injectInfo]);

  return (
    <Stack className="container addInfo" sx={{ alignItems: "center" }}>
      {" "}
      {userRole === "admin" || userRole === "moderator" ? (
        <Stack>
          {requestInfo ? (
            <Stack>
              <Stack>
                <Typography variant="h4" gutterBottom>
                  Thông tin yêu cầu thay đổi
                </Typography>
              </Stack>
              <Stack>
                <Typography>Người yêu cầu: {requestInfo?.name}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={10}
                sx={{ justifyContent: "center" }}
              >
                <Stack>
                  <Typography>Dữ liệu trên máy chủ</Typography>
                  <Typography>
                    {" "}
                    {injectInfo?.numberOfInjections === "" ? (
                      <Typography>Số mũi đã tiêm: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Số mũi đã tiêm: {injectInfo?.numberOfInjections}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.firstDose === "" ? (
                      <Typography>Mũi số 1: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 1: {injectInfo?.firstDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.injectDate1 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 1: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 1: {injectInfo?.injectDate1}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.injectPerson1 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 1: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 1: {injectInfo?.injectPerson1}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.secondDose === "" ? (
                      <Typography>Mũi số 2: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 2: {injectInfo?.secondDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {" "}
                    {injectInfo?.injectDate2 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 2: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 2: {injectInfo?.injectDate2}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.injectPerson2 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 2: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 2: {injectInfo?.injectPerson2}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.thirdDose === "" ? (
                      <Typography>Mũi số 3: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 3: {injectInfo?.thirdDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.injectDate3 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 3: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 3: {injectInfo?.injectDate3}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {injectInfo?.injectPerson3 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 3: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 3: {injectInfo?.injectPerson3}{" "}
                      </Typography>
                    )}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography>Yêu cầu thay đổi</Typography>
                  <Typography>
                    {" "}
                    {requestInfo?.numberOfInjections === "" ? (
                      <Typography>Số mũi đã tiêm: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Số mũi đã tiêm: {requestInfo?.numberOfInjections}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.firstDose === "" ? (
                      <Typography>Mũi số 1: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 1: {requestInfo?.firstDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.injectDate1 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 1: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 1: {requestInfo?.injectDate1}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.injectPerson1 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 1: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 1: {requestInfo?.injectPerson1}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.secondDose === "" ? (
                      <Typography>Mũi số 2: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 2: {requestInfo?.secondDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {" "}
                    {requestInfo?.injectDate2 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 2: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 2: {requestInfo?.injectDate2}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.injectPerson2 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 2: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 2: {requestInfo?.injectPerson2}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.thirdDose === "" ? (
                      <Typography>Mũi số 3: Chưa có thông tin</Typography>
                    ) : (
                      <Typography>
                        Mũi số 3: {requestInfo?.thirdDose}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.injectDate3 === "" ? (
                      <Typography>
                        Ngày tiêm mũi 3: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Ngày tiêm mũi 3: {requestInfo?.injectDate3}{" "}
                      </Typography>
                    )}
                  </Typography>
                  <Typography>
                    {requestInfo?.injectPerson3 === "" ? (
                      <Typography>
                        Đơn vị tiêm mũi 3: Chưa có thông tin
                      </Typography>
                    ) : (
                      <Typography>
                        Đơn vị tiêm mũi 3: {requestInfo?.injectPerson3}{" "}
                      </Typography>
                    )}
                  </Typography>
                  {/* <img src={requestInfo?.imageProof}></img> */}
                </Stack>

              </Stack>
              <Stack sx={{marginTop: 3}}>
                <Link href={requestInfo?.imageProof} target="blank">Hình ảnh minh chứng</Link>
                </Stack>
              <Stack
                direction="row"
                spacing={10}
                sx={{ justifyContent: "center", marginTop: 5 }}
              >
                <Stack>
                  <Button variant="contained" type="sumbit" onClick={handleConfirm}>
                    Chấp thuận
                  </Button>
                </Stack>
                <Stack>
                  <Button
                    variant="contained"
                    type="sumbit"
                    onClick={handleClickOpen}
                  >
                    Từ chối
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Nhập lí do từ chối</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Hãy nhập lí do từ chối thông tin này
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nhập lí do"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setReason(e.target.value)}
                        value={reason}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseReject}>OK</Button>
                      <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <Stack className="addRole-form">
                <Stack spacing={2}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    label="Tìm theo số điện thoại"
                    className="addInfo-findWithPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    type="sumbit"
                    onClick={findInfoByPhoneHandler}
                  >
                    Tìm
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack>
          <Stack>
            <Typography variant="h5" gutterBottom>
              Bạn không đủ quyền hạn để truy cập
            </Typography>
            <Stack>
              <Button variant="contained">Quay lại trang chủ</Button>
            </Stack>
          </Stack>{" "}
        </Stack>
      )}
    </Stack>
  );
};
