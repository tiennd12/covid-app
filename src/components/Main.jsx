import React from "react";

export const Main = ({ inputPhone, setInputPhone, inputId, setInputId }) => {
  const phoneInputHandler = (e) => {
      setInputPhone(e.target.value);
  };
  const idInputHandler = (e) => {
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
    <div>
      <form>
        <input
          type="text"
          className="phone-input"
          placeholder="Nhập số điện thoại"
          onChange={phoneInputHandler}
          value={inputPhone}
        />
        <input
          type="text"
          className="id-input"
          placeholder="Nhập số CMND/CCCD"
          onChange={idInputHandler}
          value={inputId}
        />
        <button className="submit-button" onClick={submitHandler}>
          Gửi
        </button>
      </form>
    </div>
  );
};
