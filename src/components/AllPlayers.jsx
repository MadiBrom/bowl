import React, { useState, useEffect } from "react";
import SinglePlayer from "./SinglePlayer";
import NewPlayerForm from "./NewPlayerForm";

const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players";

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  async function fetchAllPlayers() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setPlayers(json.data.players);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const handlePlayerAdded = (newPlayer) => {
    setPlayers((prevPlayers) => [newPlayer, ...prevPlayers]);
  };

  async function removePlayer(playerId) {
    try {
      await fetch(`${API_URL}/${playerId}`, {
        method: "DELETE",
      });
      // Refresh player list after removal
      fetchAllPlayers();
    } catch (error) {
      console.log(error);
    }
  }

  function renderAllPlayers(playerList) {
    if (playerList.length === 0) {
      return <div>No players found.</div>;
    }

    playerList.sort((a, b) => a.name.localeCompare(b.name));

    return playerList.map((player) => (
      <div key={player.id}>
        <h3>{player.name}</h3>
        <section>
          <p>ID: {player.id}</p>
          <p>Breed: {player.breed}</p>
          <p>Status: {player.status}</p>
          <img id="img" src={player.imageUrl} alt={player.name} />
        </section>
        <br />
        <button onClick={() => setSelectedPlayerId(player.id)}>
          See Details
        </button>
        <button
          onClick={async () => {
            await removePlayer(player.id);
          }}
        >
          Remove
        </button>
      </div>
    ));
  }

  return (
    <main>
      {selectedPlayerId ? (
        <SinglePlayer
          playerId={selectedPlayerId}
          onBack={() => setSelectedPlayerId(null)}
        />
      ) : (
        <>
          <NewPlayerForm onPlayerAdded={handlePlayerAdded} />
          {renderAllPlayers(players)}
        </>
      )}
    </main>
  );
}

export default AllPlayers;
