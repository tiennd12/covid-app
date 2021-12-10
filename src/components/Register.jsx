import React, { useState, useEffect } from "react";
import axios from "axios";
import Name from "./Name";

const Register = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRepeatPassword, setInputRepeatPassword] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputCity, setInputCity] = useState([]);
  const [inputCityCode, setInputCityCode] = useState("");
  const [inputDistrict, setInputDistrict] = useState([]);


  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const inputRepeatPasswordHandler = (e) => {
    setInputRepeatPassword(e.target.value);
  };
  const inputPhoneHandler = (e) => {
    setInputPhone(e.target.value);
  };
  const inputDateHandler = (e) => {
    setInputDate(e.target.value);
  };
  const inputCityCodeHandler = (e) => {
    setInputCityCode(e.target.value);
  }

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;
      
      setInputCity(data);
      // data.map((val) => {setInputCityCode(val.code)})
    });
  }, []);

  console.log(inputCityCode)

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
          <label>Mật khẩu: </label>
          <input
            type="password"
            className="register-password"
            placeholder="Mật khẩu"
            onChange={inputPasswordHandler}
            value={inputPassword}
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu: </label>
          <input
            type="password"
            className="register-password-repeat"
            placeholder="Nhập lại mật khẩu"
            onChange={inputRepeatPasswordHandler}
            value={inputRepeatPassword}
          />
        </div>
        <div>
          <label>Số điện thoại: </label>
          <input
            type="number"
            className="register-phone"
            placeholder="Số điện thoại"
            onChange={inputPhoneHandler}
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
          <select className="register-city" onChange={inputCityCodeHandler} >
            {inputCity && inputCity.map((val) => (
              <option key={val.code}>{val.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quận/Huyện</label>
          <select className="register-district" onChange={inputCityCodeHandler} >
            {inputCity && inputCity.map((val) => (
              <Name val={val} />
            ))}
          </select>
        </div>
        <div>
          <label>Phường/Xã</label>
          <input
            type="text"
            className="register-ward"
            placeholder="Phường/Xã"
          />
        </div>
        <button>Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
