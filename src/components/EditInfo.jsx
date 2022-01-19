import React, { useState, useEffect } from "react";
import { onSnapshot, setDoc, doc } from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  dataRef,
  db,
  injectionRef,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AddInfo = ({userId, setUserId}) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");


  const submitInfoHanlder = (e) => {
    e.preventDefault();

    setDoc(doc(db, "injectionData", userId), {
      ...userInfo,
      injectDate: date,
      injectPlace: place,
      numberOfInjections: times,
    });
    setDate("");
    setPlace("");
    setTimes("");
  };

  console.log(userId)

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
      {userId ? (
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
          Data not found
        </div>
      )}
    </div>
  );
};

export default AddInfo;
