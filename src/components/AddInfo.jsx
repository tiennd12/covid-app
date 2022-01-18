import React, { useState, useEffect } from "react";
import { onSnapshot, setDoc, doc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  dataRef,
  db,
} from "../firebase/firebase";

const AddInfo = () => {
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userId, setUserId] = useState("");

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(phone), (snapshot) => {
        snapshot.forEach((data) => setUserInfo(data.data()));
      });
    }
    if (auth.currentUser) {
      for (let i = 0; i < totalUserInfo.length; i++) {
        if (auth.currentUser.email === totalUserInfo[i].email) {
          setUserId(totalUserInfo[i].id);
        }
        break;
      }
    }
  };

  const submitInfoHanlder = (e) => {
    e.preventDefault();

    setDoc(doc(db, "userData", userId), {
      ...userInfo,
      injectDate: date,
      injectPlace: place,
      numberOfInjections: times,
    });
    setDate("");
    setPlace("");
    setTimes("");
  };

  console.log(userId);

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
    <div>
      {userInfo ? (
        <div>
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
          </div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Địa điểm tiêm"
                className="addInfo-place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Ngày tiêm"
                className="addInfo-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <select
                className="addInfo-times"
                onChange={(e) => setTimes(e.target.value)}
                value={times}
              >
                <option value="" disabled>
                  Mũi tiêm số
                </option>
                <option value="1 mũi">Mũi 1</option>
                <option value="2 mũi">Mũi 2</option>
                <option value="3 mũi">Mũi 3</option>
              </select>
            </div>
            <div>
              <button type="submit" onClick={submitInfoHanlder}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <form className="addInfo-form">
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
      )}
    </div>
  );
};

export default AddInfo;
