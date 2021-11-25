import "./App.css";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";

function App() {
  const [inputPhone, setInputPhone] = useState("");
  const [inputId, setInputId] = useState("");
  return (
    <div className="App">
      <NavBar />
      <Main
        inputPhone={inputPhone}
        setInputPhone={setInputPhone}
        inputId={inputId}
        setInputId={setInputId}
      />
    </div>
  );
}

export default App;
