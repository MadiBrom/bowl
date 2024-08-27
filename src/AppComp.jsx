import React, { useEffect, useState } from "react";
import Players from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./NewPlayerForm";
import "./App.css";

const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players";

function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(API_URL);
        const json = response.json();
        setPlayers(json.data.players);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayers;
  });

  const handlePlayerSelect = (id) => {
    setSelectedPlayerId(id);
  };

  const handleBack = () => {
    setSelectedPlayerId(null);
  };
  const handlePlayerAdded = (newPlayer) => {
    setPlayers((prevPlayers) => [newPlayer, ...prevPlayers]);
  };

  return (
    <div>
      <h1>Players</h1>
      {selectedPlayerId ? (
        <SinglePlayer playerId={selectedPlayerId} onBack={handleBack} />
      ) : (
        <>
          <NewPlayerForm onPlayerAdded={handlePlayerAdded} />
          <Players players={players} onPlayerSelect={handlePlayerSelect} />
        </>
      )}
    </div>
  );
}

export default App;
