import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addDoc, setDoc, onSnapshot, doc } from "@firebase/firestore";
import { dataRef, requestRef } from "../firebase/firebase";
import {
  auth,
  queryGetUserInfoByPhone,
  db,
  queryGetUserInfoByEmail,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const RequestChange = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [district, setDistrict] = useState([]);
  const [inputDistrict, setInputDistrict] = useState("");

  const [ward, setWard] = useState([]);
  const [inputWard, setInputWard] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      onSnapshot(queryGetUserInfoByEmail(userEmail), (snapshot) => {
        snapshot.forEach((data) => setPhone(data.data().phone));
      });
    }
  });

  //UseForm

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handlers

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

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;

      setFetchData(data);
    });
    fetchDistrict();
    fetchWard();
  }, [inputCity, inputDistrict]);

  return (
    <div className="container requestChange">
      <div>
        <div><h2>Điền thông tin cần  thay đổi</h2></div>
        <form
          className="request-form"
          onSubmit={handleSubmit((data) => {
            if (district && ward) {
              const updateData = addDoc(requestRef, {
                city: district.name,
                district: ward.name,
                ward: inputWard,
                name: data.inputName,
                phoneToChange: data.inputPhone,
                phone: phone,
                dob: data.dob,
                address: data.inputAddress,
                reason: data.inputReason,
              });

              if (updateData) {
                window.alert(
                  "Gửi thông tin thành công, vui lòng đợi thông tin được phê duyệt"
                );
                navigate("/");
              }
            }
          })}
        >
          <div>
            Họ và tên:
            <input
              type="text"
              {...register("inputName", { required: "Không được để trống" })}
            />
            <span> {errors.inputName?.message}</span>
          </div>
          <div>
            <label>Số điện thoại: </label>
            <input
              className="register-phone"
              placeholder="Số điện thoại"
              {...register(
                "inputPhone",
                {
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Nhập đúng định dạng số điện thoại",
                  }
                }

              )}
            />
            <span> {errors.inputPhone?.message}</span>
          </div>
          <div>
            <label>Ngày sinh (Tháng/Ngày/Năm): </label>
            <input
              type="date"
              {...register("dob", { required: "Không được để trống" })}
            />
            <span> {errors.dob?.message}</span>
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
              {...register("inputAddress", { required: "Không được để trống" })}
            />
            <span> {errors.inputAddress?.message}</span>
          </div>
          <div>
            <label>Lý do thay đổi: </label>
            <input
              type="text"
              {...register("inputReason", { required: "Không được để trống" })}
            />
            <span> {errors.inputReason?.message}</span>
          </div>
          <div>
            <button type="submit">Gửi yêu cầu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestChange;
