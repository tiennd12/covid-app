import "./App.css";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [inputPhone, setInputPhone] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                inputPhone={inputPhone}
                setInputPhone={setInputPhone}
                inputId={inputId}
                setInputId={setInputId}
              />
            }
          ></Route>

          <Route
            path="/login"
            element={
              <Login
                inputUsername={inputUsername}
                setInputUsername={setInputUsername}
                inputPassword={inputPassword}
                setInputPassword={setInputPassword}
              />
            }
          />
          <Route path="/register" element={<Register />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
