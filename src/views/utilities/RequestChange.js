import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useDistrict from "../../Hooks/useDistrict";
import axios from "axios";
import { addDoc, setDoc, onSnapshot, doc } from "@firebase/firestore";
import { dataRef, injectionRef } from "../../firebase/firebase";
import { auth, queryGetUserInfoByEmail, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Container, Grid, Button, TextField, Stack, MenuItem, FormControl, Select, InputLabel, Typography, Card, CardActions, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
const RequestChange = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputEmail, setInputEmail] = useState("");
  // const [inputName, setInputName] = useState("");
  const [inputDate1, setInputDate1] = useState("");
  
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("")
  const [userData, setUserData] = useState({})
  // const [inputAddress, setInputAddress] = useState("");

  const [fetchData, setFetchData] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [district, setDistrict] = useState([]);
  const [inputDistrict, setInputDistrict] = useState("");

  const [ward, setWard] = useState([]);
  const [inputWard, setInputWard] = useState("");

  const [cityName, setCityName] = useState("");
  const [position, setPosition] = useState(0);

  //useDistrict
  const { districtName } = useDistrict(district.name);


  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };

  const districtNameHandler = () => {
    if (district !== null) {
      if (district.name.includes("Tỉnh")) {
        setCityName(district.name.replace("Tỉnh", ""));
      }
    }
  };
  const cityNameHandler = () => {
    if (district !== null) {
      if (district.name.includes("Thành phố")) {
        setCityName(district.name.replace("Thành phố", ""));
      }
    }
  };

  const cityHandler = (e) => {
    setInputCity(e.target.value);
    setInputDistrict("");
    setInputWard("");
  };

  const districtHandler = (e) => {
    setInputDistrict(e.target.value);
    setInputWard("");
    // districtNameHandler();
    // cityNameHandler();
  };


  useEffect(() => {
    const fetchDistrict = async () => {
      if (inputCity) {
        const { data } = await axios.get(
          `https://provinces.open-api.vn/api/p/${inputCity}?depth=2`
        );
        setDistrict(data);
      } else {
        setDistrict("");
      }
    };

    const fetchWard = async () => {
      if (inputDistrict) {
        const { data } = await axios.get(
          `https://provinces.open-api.vn/api/d/${inputDistrict}?depth=2`
        );
        setWard(data);
      }
    };

    fetchDistrict();
    fetchWard();

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setInputEmail(currentUser.email);
        }
      });



    axios.get("https://provinces.open-api.vn/api/?depth=1").then((result) => {
      const { data } = result;

      setFetchData(data);
    });
    if(inputEmail){
        onSnapshot(queryGetUserInfoByEmail(inputEmail), (snapshot) => {
            snapshot.forEach((data) => {
                setUserId(data.id)
                setUserData(data.data())
            })
        })
    }
console.log(userId)
  }, [inputCity, inputDistrict, cityName, inputEmail]);

  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [totalUserInfo, setTotalUserInfo] = useState("");

  const useStyles = makeStyles((theme) => ({
    header: {
      marginBottom: '30px',
      textTransform: 'uppercase',
    },
    textField: {
      marginBottom: '38px'
    },
    form: {
      border: '1px solid black',
      boxShadow: '1px 2px 4px rgba(0,0,0,0.4)',
      borderRadius: '10px',
      padding: '20px',
    }
  }));

  const classes = useStyles();

  return (
    <Container className="container register">
      <Card sx={{ minWidth: '270px' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <form
            onSubmit={handleSubmit((data) => {
              if (
                window.confirm("Hãy chắc chắn những thông tin đã nhập là chính xác")
              ) {
                if (district && ward) {
                  const updateData = setDoc(doc(db, "userData", userId),
                  {
                    ...userData,
                    city: district.name,
                    district: ward.name,
                    ward: inputWard,
                    name: data.inputName,
                    dob: data.inputDate,
                    address: data.inputAddress,
                    districtId: districtName,
                    gender,
                  });

                  if (updateData) {
                    window.alert("Cập nhật thành công");
                    navigate("/utils/info");
                  }
                }
              }
              // console.log(data, inputWard);
            })}
          >
            <Stack className={classes.form}>
              <Typography variant="h2" gutterBottom className={classes.header}>
                Thay đổi thông tin cá nhân
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <>
                    <TextField
                      fullWidth
                      sx={{ margin: 1 }}
                      variant="outlined"
                      label="Họ và tên"
                      autoComplete="off"
                      className={classes.textField}
                      {...register("inputName", { required: "Điền tên" })}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ color: "red" }}
                    >
                      {errors.inputName?.message}
                    </Typography>
                  </>

                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    id="standard=basic"
                    label="CMND/CCCD"
                    autoComplete="off"
                    helperText=""
                    sx={{ margin: 1 }}
                    {...register("inputId", { required: "Nhập số CMND hoặc số CCCD" })}
                  />

                  <>
                    <TextField
                      fullWidth
                      sx={{ margin: 1, minWidth: 184 }}
                      id="standard-basic"
                      helperText="Tháng/Ngày/Năm sinh"
                      variant="outlined"
                      type="date"
                      className={classes.textField}
                      {...register("inputDate", { required: "Nhập ngày tháng năm sinh" })}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ color: "red" }}
                    >
                      {errors.inputDate?.message}
                    </Typography>
                  </>
                  <>
                    <TextField
                      fullWidth
                      className={classes.textField}
                      label="Địa chỉ"
                      sx={{ margin: 1, marginBottom: 2 }}
                      id="standard-basic"
                      variant="outlined"
                      autoComplete="off"
                      {...register("inputAddress", { required: "Điền địa chỉ" })}
                    />

                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ color: "red" }}
                    >
                      {errors.inputAddress?.message}
                    </Typography>
                  </>
                </Grid>
                <Grid item sm={6}>
                 
                  <Stack>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                    <Select
                        fullWidth
                        sx={{ minWidth: 120 }}
                        label={"Giới tính"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={e => setGender(e.target.value)}
                        value={gender}
                        className={classes.textField}
                      >
                        <MenuItem value="" disabled>Giới tính</MenuItem>
                        <MenuItem value="Nam">Nam</MenuItem>
                        <MenuItem value="Nữ">Nữ</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
                      <Select
                        fullWidth
                        sx={{ minWidth: 120 }}
                        label={"Thành phố"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={cityHandler}
                        value={inputCity}
                        className={classes.textField}
                      >
                        <MenuItem value="" disabled>
                          Chọn thành phố
                        </MenuItem>
                        {fetchData &&
                          fetchData.map((val) => (
                            <MenuItem key={val.code} value={val.code}>
                              {val.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                      <Select
                        fullWidth
                        sx={{ minWidth: 120 }}
                        label={"Quận/Huyện"}
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select"
                        onChange={districtHandler}
                        value={inputDistrict}
                        className={classes.textField}
                      >
                        <MenuItem value="" disabled>
                          Chọn quận huyện
                        </MenuItem>
                        {district.districts &&
                          district.districts.map((val) => (
                            <MenuItem key={val.code} value={val.code}>
                              {val.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
                      <Select
                        fullWidth
                        sx={{ minWidth: 120 }}
                        label={"Phường/Xã"}
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select"
                        onChange={(event) => setInputWard(event.target.value)}
                        value={inputWard}
                        className={classes.textField}
                      >
                        <MenuItem value="" disabled>
                          Chọn phường xã
                        </MenuItem>
                        {ward.wards &&
                          ward.wards.map((val) => (
                            <MenuItem key={val.code} value={val.name}>
                              {val.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>



              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" type="submit">
                  Gửi
                </Button>
              </CardActions>
            </Stack>
          </form>
        </CardContent>
      </Card>

    </Container>
  );
};

export default RequestChange;
//onClick={inputSubmithandler}
