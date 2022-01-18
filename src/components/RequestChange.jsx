import React, { useState, useEffect } from "react";

import { auth } from "../firebase/firebase";

const RequestChange = () => {
  const [name, setName] = useState("");
  console.log(auth.currentUser);
  return (
    <div>
      <div>
        <form action="">
          <div>
            Tên của bạn:
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>Địa chỉ: </div>
          <div>
            Số mũi đã tiêm:
            <select name="" id="">
              <option value="1 mũi">1 mũi</option>
              <option value="2 mũi">2 mũi</option>
              <option value="3 mũi">3 mũi</option>
            </select>
          </div>
          <div>
            Ngày tiêm:
            <input type="date" />
          </div>
          {/* <div>Địa điểm tiêm: </div> */}
          <div>
            <button>Gửi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestChange;
