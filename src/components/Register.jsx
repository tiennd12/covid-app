import React, { useState } from "react";

const Register = () => {
  return (
    <div>
      <form className="register-form">
        <div>
          <label>Email</label>
          <input type="text" className="register-id" placeholder="Email" />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            className="register-password"
            placeholder="Mật khẩu"
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu </label>
          <input
            type="password"
            className="register-password-repeat"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div>
          <label>Số điện thoại</label>
          <input
            type="text"
            className="register-phone"
            placeholder="Số điện thoại"
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
