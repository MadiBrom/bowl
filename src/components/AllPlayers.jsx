import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewPlayer from "./NewPlayerForm";
import { fetchAllPlayers } from "../API";

function AllPlayers() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      const data = await fetchAllPlayers();
      setPlayers(data);
    }
    fetchPlayers();
  }, [setPlayers]);

  return (
    <div>
      <h2>All Players</h2>
      <AddNewPlayer setPlayers={setPlayers} players={players} />
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <img id="img" src={player.imageUrl} alt={player.name} />
            <button onClick={() => navigate(`/player/${player.id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllPlayers;
