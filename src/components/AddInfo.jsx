import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  collection,
} from "@firebase/firestore";
import {
  auth,
  queryGetUserInfoByPhone,
  dataRef,
  db,
  injectionRef,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AddInfo = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [vaccineType1, setVaccineType1] = useState("");
  const [vaccineType2, setVaccineType2] = useState("");
  const [vaccineType3, setVaccineType3] = useState("");

  const [totalUserInfo, setTotalUserInfo] = useState("");
  const [totalInjectionInfo, setTotalInjectionInfo] = useState([]);

  const [userInfo, setUserInfo] = useState("");
  const [injectionInfo, setInjectionInfo] = useState({});
  const [injectionId, setInjectionId] = useState("");

  const findInfoByPhoneHandler = (e) => {
    e.preventDefault();

   // for (let i = 0; i < totalInjectionInfo.length; i++) {
      // if (phone !== totalInjectionInfo[i].phone) {
      //   navigate("/editinfo");
      //   console.log("object");
      //   break;
      // } else {
      //   addDoc(injectionRef, {
      //     phone: phone,
      //   });
      // }
    //}

    if (totalUserInfo) {
      onSnapshot(queryGetUserInfoByPhone(dataRef, phone), (snapshot) => {
        {
          snapshot.forEach((data) => {
            // console.log(data.data().phone);
            setUserInfo(data.data());
            setUserId(data.id);
          });
        }
      });
      onSnapshot(
        queryGetUserInfoByPhone(injectionRef, phone),
        async (snapshot) => {
          if (injectionId) {
            const docRef = doc(db, "injectionData", injectionId);
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }

          {
            snapshot.forEach((data) => {
              // console.log(data.data().phone);
              setInjectionInfo(data.data());
              setInjectionId(data.id);
            });
          }
        }
      );
    }
  };

  const submitInfoHanlder = (e) => {
    e.preventDefault();
    // onSnapshot(queryGetUserInfoByPhone(injectionRef, phone), (snapshot) => {
    //   {
    //     snapshot.forEach((data) => {
    //       // console.log(data.data().phone);
    //       setInjectionInfo(data.data());
    //       setInjectionId(data.id);
    //     });
    //   }
    // });

    // addDoc(injectionRef, {
    //   injectDate: date,
    //   injectPlace: place,
    //   numberOfInjections: times,
    //   phone: phone,
    // });
    setDoc(doc(db, "injectionData", injectionId), {
      ...injectionInfo,
      injectDate: date,
      injectPlace: place,
      numberOfInjections: times,
      firstDose: vaccineType1,
      secondDose: vaccineType2,
      thirdDose: vaccineType3,
    });
    setDate("");
    setPlace("");
    setTimes("");
  };

  const deleteInfoHandler = (e) => {
    if (window.confirm("Bạn có muốn xóa dữ liệu của người dùng này không?")) {
      deleteDoc(doc(db, "injectionData", injectionId));
      window.prompt("Dữ liệu đã được xóa");
      window.location.reload(true);
    }
  };

  useEffect(() => {
    onSnapshot(injectionRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalInjectionInfo(users);
    });
    onSnapshot(dataRef, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setTotalUserInfo(users);
    });
  }, []);

  // console.log(injectionInfo)

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
              <h3>Số mũi đã tiêm: {injectionInfo.numberOfInjections} </h3>
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
              <label htmlFor="">Mũi 1: </label>
              <select
                onChange={(e) => setVaccineType1(e.target.value)}
                value={vaccineType1}
              >
                <option value="Chưa tiêm">Chưa tiêm</option>
                <option value="Nanocovax">Nanocovax</option>
                <option value="Pfizer-BioNTech">Pfizer-BioNTech</option>
                <option value="AstraZeneca">AstraZeneca</option>
                <option value="Moderna">Moderna</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Mũi 2: </label>
              <select
                onChange={(e) => setVaccineType2(e.target.value)}
                value={vaccineType2}
              >
                <option value="Chưa tiêm">Chưa tiêm</option>
                <option value="Nanocovax">Nanocovax</option>
                <option value="Pfizer-BioNTech">Pfizer-BioNTech</option>
                <option value="AstraZeneca">AstraZeneca</option>
                <option value="Moderna">Moderna</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Mũi 3: </label>
              <select
                onChange={(e) => setVaccineType3(e.target.value)}
                value={vaccineType3}
              >
                <option value="Chưa tiêm">Chưa tiêm</option>
                <option value="Nanocovax">Nanocovax</option>
                <option value="Pfizer-BioNTech">Pfizer-BioNTech</option>
                <option value="AstraZeneca">AstraZeneca</option>
                <option value="Moderna">Moderna</option>
              </select>
            </div>
            <div>
              <button type="submit" onClick={submitInfoHanlder}>
                Gửi
              </button>
            </div>
            <div>
              <button onClick={deleteInfoHandler}>Xóa dữ liệu</button>
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
