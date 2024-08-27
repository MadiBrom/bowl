import React, { useState, useEffect } from "react";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT";

function SinglePlayer({ playerId, onBack }) {
  const [player, setPlayer] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);

  async function fetchSinglePlayer(id) {
    try {
      const response = await fetch(`${API_URL}/players/${id}`);
      const json = await response.json;
      setPlayer(json.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchSinglePlayer(playerId);
    const timer = setTimeout(() => {
      setShowTryAgain(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [playerId]);

  return (
    <main>
      {player ? (
        <div>
          <h3>{player.name}</h3>
          <section>
            <p>ID: {player.id}</p>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            <img id="img" src={player.imageUrl} alt={player.name} />
          </section>
          <button onClick={onBack}>Home</button>
        </div>
      ) : (
        <div>
          <div>Loading...</div>
          {(() => {
            if (showTryAgain) {
              return (
                <div>
                  <p>Taking longer than expected...</p>
                  <button onClick={onBack}>Home</button>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </div>
      )}
    </main>
  );
}
export default SinglePlayer;
