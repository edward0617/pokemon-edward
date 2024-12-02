import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/details/:id" element={<CardDetail />} />
      </Routes>
    </div>
  );
}

export default App;
