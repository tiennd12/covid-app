import React from "react";

const Register = () => {
  return (
    <div>
      <form className="register-form">
        <input type="text" className="register-id" placeholder="Email" />
        <input
          type="password"
          className="register-password"
          placeholder="Mật khẩu"
        />
        <input
          type="password"
          className="register-password-repeat"
          placeholder="Nhập lại mật khẩu"
        />
        <input
          type="text"
          className="register-phone"
          placeholder="Số điện thoại"
        />
        <label>Ngày sinh
            <select>
                <option value=""></option>
            </select>
        </label>
      </form>
    </div>
  );
};

export default Register;
