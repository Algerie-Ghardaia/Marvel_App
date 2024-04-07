import "./App.css";
import React from "react";
import NavBar from "./component/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//-------------------PAGES--------------------//
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
// import Comic from "./pages/Comic";
//--------------------------------------------//

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:characterId" element={<Character />} />
            <Route path="/comics" element={<Comics />} />
            {/* <Route path="/comics/:characterId" element={<Comic/>} />
            <Route path="/comic" element={<Comic/>} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

