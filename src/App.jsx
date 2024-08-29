import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import allPlayers from "./components/AllPlayers";
import addNewPlayer from "./components/NewPlayerForm";
import "./App.css";

function App() {
  return (
    <div id="container">
      <div id="navbar">
        {/* Buttons for navigating */}
        <button onClick={() => navigate("/")}>Show All Players</button>
        <button onClick={() => navigate("/new-player-form")}>
          Add New Player
        </button>
      </div>
      <div id="main-section">
        <Routes location={location}>
          <Route path="/" element={<AllPlayers />} />
          <Route path="/new-player-form" element={<NewPlayerForm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
