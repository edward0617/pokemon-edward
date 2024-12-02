import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <div className="App">
      <div className="main__container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
