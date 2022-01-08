import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const [inputPhone, setInputPhone] = useState("");
  const [inputId, setInputId] = useState("");

  const inputPhoneHandler = (e) => {
    setInputPhone(e.target.value);
  };
  const inputIdHandler = (e) => {
    setInputId(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // if (!inputPhone && !inputId) {
    //   return
    // }
    console.log(inputPhone, inputId);
    setInputPhone("");
    setInputId("");
  };

  return (
    <nav>
        <div>
      <Link to="/">
        <h1>TRA CỨU TÌNH TRẠNG TIÊM CHỦNG</h1>
      </Link>
      </div>
      <div>
      <form className="look-form">
        <input
          type="text"
          className="phone-input"
          placeholder="Nhập số điện thoại"
          onChange={inputPhoneHandler}
          value={inputPhone}
        />
        <input
          type="text"
          className="id-input"
          placeholder="Nhập số CMND/CCCD"
          onChange={inputIdHandler}
          value={inputId}
        />
        <button className="submit-button" onClick={submitHandler}>
          Tra cứu
        </button>
      </form>
      </div>
    </nav>
  );
};
