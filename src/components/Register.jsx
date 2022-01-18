import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addDoc } from "@firebase/firestore";
import { dataRef } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors} } = useForm();

  const [inputEmail, setInputEmail] = useState("");
  // const [inputName, setInputName] = useState("");
  // const [inputPhone, setInputPhone] = useState("");
  // const [inputDate, setInputDate] = useState("");
  // const [inputAddress, setInputAddress] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [district, setDistrict] = useState([]);
  const [inputDistrict, setInputDistrict] = useState("");

  const [ward, setWard] = useState([]);
  const [inputWard, setInputWard] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setInputEmail(currentUser.email);
    }

  });

  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  // const inputNameHandler = (e) => {
  //   setInputName(e.target.value);
  // };
  // const inputDateHandler = (e) => {
  //   setInputDate(e.target.value);
  // };

  // const inputSubmithandler = async (e) => {
  //   e.preventDefault();

  //   // add data to collection

  //   setInputEmail("");
  //   setInputPhone("");
  //   setInputDate("");
  //   setInputName("");
  //   setInputAddress("");
  // };

  // const phoneHandler = (e) => {
  //   let reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  //   if (reg.test(e.target.value)) {
  //     setInputPhone(e.target.value);
  //   }
  // };

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

  // console.log(typeof cityName);

  // const fetchExactWard = async

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;

      setFetchData(data);
    });
    fetchDistrict();
    fetchWard();
  }, [inputCity, inputDistrict]);

  return (
    <div>
      <form
        className="register-form"
        onSubmit={handleSubmit((data) => {
          if (district && ward) {
            const updateData =  addDoc(dataRef, {
              city: district.name,
              district: ward.name,
              ward: inputWard,
              name: data.inputName,
              email: inputEmail,
              phone: data.inputPhone,
              dob: data.inputDate,
              address: data.inputAddress,
            });
            if (updateData) {
              window.alert("Đăng kí thành công");
              navigate("/");
            }
          }
          console.log(data, district.name);
        })}
      >
        <div>
          <label>Email: </label>
          <input
            type="text"
            className="register-id"
            placeholder="Email"
            onChange={inputEmailHandler}
            value={inputEmail}
            disabled
          />
        </div>
        <div>
          <label>Họ và tên: </label>
          <input
            {...register("inputName", { required: "Điền tên" })}
            placeholder="Họ và tên"
            className="register-name"
          />
          <span> {errors.inputName?.message}</span>
        </div>
        <div>
          <label>Số điện thoại: </label>
          <input
            className="register-phone"
            placeholder="Số điện thoại"
            {...register("inputPhone", { required: "Điền số điện thoại" })}
          />
          <span> {errors.inputPhone?.message}</span>
        </div>
        <div>
          <label>Ngày sinh: </label>
          <input
            type="date"
            className="register-dob"
            {...register("inputDate", { required: "Điền ngày tháng năm sinh" })}
          />
          <span> {errors.inputDate?.message}</span>
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
        <div>
          <label>Địa chỉ: </label>
          <input
            placeholder="Địa chỉ"
            {...register("inputAddress", { required: "Điền địa chỉ" })}
          />
          <span> {errors.inputAddress?.message}</span>
        </div>
        <div id="sign-in-button"></div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
//onClick={inputSubmithandler}
