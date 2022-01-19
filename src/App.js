import "./App.css";
import {useState} from "react"
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddInfo from "./components/AddInfo";
import AddRole from "./components/AddRole";
import RequestChange from "./components/RequestChange";
import EditInfo from "./components/EditInfo";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/addinfo"
            element={<AddInfo userId={userId} setUserId={setUserId} />}
          ></Route>
          <Route path="/addrole" element={<AddRole />}></Route>
          <Route path="/requestchange" element={<RequestChange />}></Route>
          <Route path="/editinfo" element={<EditInfo userId={userId} setUserId={setUserId} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
