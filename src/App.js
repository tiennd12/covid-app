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

function App() {
  const [inputPhone, setInputPhone] = useState("");
  const [inputId, setInputId] = useState("");

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

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
