import "./App.css";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddInfo from "./components/AddInfo";
import AddRole from "./components/AddRole";
import RequestChange from "./components/RequestChange";
import EditInfo from "./components/EditInfo";
import AdminPanel from "./components/AdminPanel";
import Profile from "./components/Profile";
import { AddInjectionInfo } from "./components/AddInjectionInfo";
import {InjectionInfoRequest} from "./components/InjectionInfoRequest"
import { ConfirmChange } from "./components/ConfirmChange";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}>
            {" "}
          </Route>{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<Register />}>
            {" "}
          </Route>{" "}
          <Route
            path="/addinfo"
            element={<AddInfo userId={userId} setUserId={setUserId} />}
          ></Route>{" "}
          <Route path="/addrole" element={<AddRole />}>
            {" "}
          </Route>{" "}
          <Route path="/requestchange" element={<RequestChange />}>
            {" "}
          </Route>{" "}
          <Route path="/confirmchange" element={<ConfirmChange />}>
            {" "}
          </Route>{" "}
          <Route
            path="/addinjectioninfo"
            element={<AddInjectionInfo userId={userId} setUserId={setUserId} />}
          ></Route>{" "}
          <Route
            path="/injectioninforequest"
            element={<InjectionInfoRequest userId={userId} setUserId={setUserId} />}
          ></Route>{" "}
          <Route path="adminpanel" element={<AdminPanel />}>
            {" "}
          </Route>{" "}
          <Route path="/profile" element={<Profile />}>
            {" "}
          </Route>{" "}
        </Routes>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
