import React, { useState } from "react";

const Register = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputRepeatPassword, setInputRepeatPassword] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputDate, setInputDate] = useState("");

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

  return (
    <div>
      <form className="register-form">
        <div>
          <label>Email</label>
          <input type="text" className="register-id" placeholder="Email" onChange={inputEmailHandler} value={inputEmail} />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            className="register-password"
            placeholder="Mật khẩu"
            onChange={inputPasswordHandler}
            value={inputPassword}
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu </label>
          <input
            type="password"
            className="register-password-repeat"
            placeholder="Nhập lại mật khẩu"
            onChange={inputRepeatPasswordHandler}
            value={inputRepeatPassword}
          />
        </div>
        <div>
          <label>Số điện thoại</label>
          <input
            type="number"
            className="register-phone"
            placeholder="Số điện thoại"
            onChange={inputPhoneHandler}
            value={inputPhone}
          />
        </div>
        <div>
          <label>Ngày sinh</label>
          <input type="date" />
        </div>
        <div>
          <label>Thành phố</label>
          <input
            type="text"
            className="register-city"
            placeholder="Thành Phố"
          />
        </div>
        <div>
          <label>Quận/Huyện</label>
          <input
            type="text"
            className="register-district"
            placeholder="Quận/Huyện"
          />
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
