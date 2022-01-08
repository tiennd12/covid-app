import React, { useState, useEffect } from "react";
import axios from "axios";
import { addDoc } from "@firebase/firestore";
import { dataRef } from "../firebase/firebase";

const Register = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDate, setInputDate] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [district, setDistrict] = useState([]);
  const [inputDistrict, setInputDistrict] = useState("");

  const [ward, setWard] = useState([]);
  const [inputWard, setInputWard] = useState("");

  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  const inputDateHandler = (e) => {
    setInputDate(e.target.value);
  };

  const inputSubmithandler = (e) => {
    e.preventDefault();
    if (district && ward) {
      addDoc(dataRef, {
        city: district.name,
        district: ward.name,
        ward: inputWard,
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        dob: inputDate,
      })
    }
    // add data to collection

    setInputEmail("");
    setInputPhone("");
    setInputDate("");
    setInputName("");
  };

  const cityHandler = (e) => {
    setInputCity(e.target.value);
    setInputDistrict("");
    setInputWard("");
  };

  const districtHandler = (e) => {
    setInputDistrict(e.target.value);
    setInputWard("");
  };

  const fetchDistrict = async () => {
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/p/${inputCity}?depth=2`
    );
    return setDistrict(data);
  };

  const fetchWard = async () => {
    if (inputDistrict) {
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/d/${inputDistrict}?depth=2`
      );
      return setWard(data);
    }
  };

  console.log(typeof cityName);

  // const fetchExactWard = async

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;

      setFetchData(data);
    });
    fetchDistrict();
    fetchWard();
  }, [inputCity, inputDistrict]);

  console.log(inputCity, inputDistrict, inputWard, ward.name, district.name);

  return (
    <div>
      <form className="register-form">
        <div>
          <label>Email: </label>
          <input
            type="text"
            className="register-id"
            placeholder="Email"
            onChange={inputEmailHandler}
            value={inputEmail}
          />
        </div>
        <div>
          <label>Họ và tên: </label>
          <input
            type="text"
            className="register-name"
            placeholder="Họ và tên"
            onChange={inputNameHandler}
            value={inputName}
          />
        </div>
        <div>
          <label>Số điện thoại: </label>
          <input
            type="number"
            className="register-phone"
            placeholder="Số điện thoại"
            onChange={(e) => setInputPhone(e.target.value)}
            value={inputPhone}
          />
        </div>
        <div>
          <label>Ngày sinh: </label>
          <input
            type="date"
            className="register-dob"
            onChange={inputDateHandler}
            value={inputDate}
          />
        </div>
        <div>
          <label>Thành phố</label>
          <select
            className="register-city"
            onChange={cityHandler}
            value={inputCity}
          >
            <option value="" disabled>
              Chọn thành phố
            </option>
            {fetchData &&
              fetchData.map((val) => (
                <option key={val.code} value={val.code}>
                  {val.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Quận/Huyện</label>
          <select
            className="register-district"
            onChange={districtHandler}
            value={inputDistrict}
          >
            <option value="" disabled>
              Chọn quận huyện
            </option>
            {district.districts &&
              district.districts.map((val) => (
                <option key={val.code} value={val.code}>
                  {val.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Phường/Xã</label>
          <select
            className="register-district"
            onChange={(event) => setInputWard(event.target.value)}
            value={inputWard}
          >
            <option value="" disabled>
              Chọn phường xã
            </option>
            {ward.wards &&
              ward.wards.map((val) => (
                <option key={val.code} value={val.name}>
                  {val.name}
                </option>
              ))}
          </select>
        </div>
        <div id="sign-in-button"></div>
        <button type="submit" onClick={inputSubmithandler}>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
