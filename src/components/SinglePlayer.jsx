import React, { useState, useEffect } from "react";
import { fetchPlayerById } from "../API";
import { useParams, Link } from "react-router-dom";

function OnePlayer() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

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
    <div className="player-container">
      <ul>
        <h2>{player.name}</h2>
        <div className="player-card">
          <h4>Breed: {player.breed}</h4>
          <h4>Status: {player.status}</h4>
          <br />
          <img src={player.imageUrl} alt={player.name} />
          <br />
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default OnePlayer;
