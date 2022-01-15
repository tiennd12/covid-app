import "./App.css";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddInfo from "./components/AddInfo";
import AddRole from "./components/AddRole";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/addinfo" element={<AddInfo />}></Route>
          <Route path="/addrole" element={<AddRole />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
