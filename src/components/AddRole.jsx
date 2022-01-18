import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, setDoc, doc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByEmail,
  queryGetUserInfoByPhone,
  dataRef,
  db,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AddRole = () => {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");


  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setUserRole(data.data().assignedRole));
      });
    }
  });

  const navigate = useNavigate();

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(phone), (snapshot) => {
        snapshot.forEach((data) => {
          setUserInfo(data.data())
          setUserId(data.id)
        });
      });
    }
  };

  const submitInfoHandler = (e) => {
    e.preventDefault();

    setDoc(doc(db, "userData", userId), {
      ...userInfo,
      assignedRole: role,
    });
    setRole("");
  };

  const backToMainPagehandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
  }, []);

  if(!userRole){
    return <div>Loading</div>
  }
  console.log(userId);
  return (
    <div>
      {userRole === "admin" ? (
        userInfo ? (
          <div>
            <div>
              <h3>Họ và tên: {userInfo.name} </h3>
            </div>
            <div>
              <h3>Số điện thoại: {userInfo.phone} </h3>
            </div>
            <div>
              <h3>Địa chỉ email: {userInfo.email} </h3>
            </div>
            <div>
              <h3>Ngày sinh: {userInfo.dob} </h3>
            </div>
            <div>
              <h3>Số mũi đã tiêm: {userInfo.numberOfInjections} </h3>
            </div>

            <div>
              <div>
                <select
                  className="addRole-role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="" disabled>
                    Phân quyền
                  </option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div>
                <button type="submit" onClick={submitInfoHandler}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <form className="addRole-form">
              <input
                type="text"
                placeholder="Tìm theo số điện thoại"
                className="addInfo-findWithPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button type="sumbit" onClick={findInfoByPhoneHandler}>
                Tìm
              </button>
            </form>
          </div>
        )
      ) : (
        <div>
          <div>Bạn không đủ quyền hạn để truy cập</div>
          <button onClick={backToMainPagehandler}>Quay lại trang chủ</button>
        </div>
      )}
    </div>
  );
};

export default AddRole;
