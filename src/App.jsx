import { Route, Routes } from "react-router-dom";
import AllPlayers from "./components/allplayers/";
import OnePlayer from "./components/SinglePlayer";
import { fetchAllPlayers } from "./API";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetchAllPlayers();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  return (
    <div id="container">
      <Routes>
        <Route
          path="/"
          element={<AllPlayers players={players} setPlayers={setPlayers} />}
        />
        <Route
          path="/NewPlayerForm"
          element={<AddNewPlayer players={players} setPlayers={setPlayers} />}
        />
        <Route path="/player/:id" element={<OnePlayer />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
