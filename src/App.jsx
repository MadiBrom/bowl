import React, { useEffect, useState } from "react";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";
import SearchComp from "./components/SearchComp";
import "./App.css";

const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players";

function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setPlayers(json.data.players);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayers();
  }, []);

  async function handlePlayerSelect(id) {
    setSelectedPlayerId(id);
  }
  function handlePlayerAdded(newPlayer) {
    setPlayers((prevPlayers) => [newPlayer, ...prevPlayers]);
  }
  function handleSearch(query) {
    setSearch(query);
  }

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NewPlayerForm onPlayerAdded={handlePlayerAdded} />
      <SearchComp onSearch={handleSearch} />
      <AllPlayers players={players} onPlayerSelect={handlePlayerSelect} />
      {selectedPlayerId && <SinglePlayer playerId={selectedPlayerId} />}
    </div>
  );
}

export default App;
