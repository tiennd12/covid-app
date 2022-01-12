import React, { useState, useEffect } from "react";
import { onSnapshot } from "@firebase/firestore";
import { auth, queryGetUserInfoByPhone, dataRef } from "../firebase/firebase";

const AddInfo = () => {
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  console.log(times)

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(phone), (snapshot) => {
        snapshot.forEach((data) => setUserInfo(data.data()));
      });
    }

    console.log(userInfo);
  };

  useEffect(() => {
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
    console.log(totalUserInfo);
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <div>
            <h3>{userInfo.name} </h3>
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
                type="text"
                placeholder="Ngày tiêm"
                className="addInfo-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
                <select className="addInfo-times" onChange={(e)=>setTimes(e.target.value)} value={times} >
                    <option value="" disabled>Mũi tiêm số</option>
                    <option value="1st">Mũi 1</option>
                    <option value="2nd">Mũi 2</option>
                    <option value="3rd">Mũi 3</option>
                </select>
            </div>
            <div>
                <button></button>
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
