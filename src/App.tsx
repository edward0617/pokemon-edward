import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router";
import CardDetail from "./pages/CardDetail";

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
