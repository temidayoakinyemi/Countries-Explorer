import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Country from "./Component/Country/Country";
import CountryDetial from "./Component/CountryDetial/CountryDetial";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/country/:name" element={<CountryDetial />} />
      </Routes>
    </Router>
  );
};

export default App;
