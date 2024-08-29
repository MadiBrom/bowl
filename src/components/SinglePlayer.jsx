import React, { useState, useEffect } from "react";
import { fetchPlayerById } from "../API";
import { useNavigate, useParams } from "react-router-dom";

function OnePlayer() {
  const navigate = useNavigate;
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  console.log(id);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const response = await fetchPlayerById(id);
        setPlayer(response);
      } catch (error) {
        console.log(error);
      }
    };

    getPlayer();
  }, [id]);

  if (!player) {
    return <p>Loading player information...</p>;
  }

  return (
    <div>
      <main>
        <ul>
          <h2>{player.name}</h2>
          <h4>Breed: {player.breed}</h4>
          <h4>Status: {player.status}</h4>
          <br />
          <img src={player.imageUrl} alt={player.name} />
          <br />
          <button onClick={() => navigate("/AllPlayers")}>Back</button>
        </ul>
      </main>
    </div>
  );
}

export default OnePlayer;
