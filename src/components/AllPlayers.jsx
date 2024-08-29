import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; // Import NavBar component
import AddNewPlayer from "./NewPlayerForm";
import { fetchAllPlayers, removePlayer } from "../API";

function AllPlayers({ players, setPlayers }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchParams.toLowerCase())
  );

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const data = await fetchAllPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    }
    fetchPlayers();
  }, [setPlayers]);

  async function handleDelete(playerId) {
    try {
      await removePlayer(playerId);
      setPlayers(players.filter((player) => player.id !== playerId));
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  }

  return (
    <div>
      <h2 id="title">Puppy Bowl</h2>
      <NavBar setSearchParams={setSearchParams} />
      <AddNewPlayer setPlayers={setPlayers} players={players} />
      <div className="players-container">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <img id="img" src={player.imageUrl} alt={player.name} />
            <button onClick={() => navigate(`/player/${player.id}`)}>
              View Details
            </button>
            <button
              onClick={() => handleDelete(player.id)}
              className="deleteButton"
            >
              Delete Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPlayers;
