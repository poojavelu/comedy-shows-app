import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowsList from "./components/ShowsList";
import ShowDetail from "./components/ShowDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>🎭 Comedy Shows Tickets</h1>
          <p>Experience world-class comedy shows in NYC</p>
        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<ShowsList />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
