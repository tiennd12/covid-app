import React from "react";

export const Main = ({ inputPhone, setInputPhone, inputId, setInputId }) => {
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
    <div>
      <form>
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
  );
};
