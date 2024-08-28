import React, { useState, useEffect } from "react";
import AllPlayers from "./AllPlayers";

const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players";

function SinglePlayer({ playerId, onBack }) {
  const [player, setPlayer] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [view, setView] = useState("details");

  async function fetchSinglePlayer(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const json = await response.json();
      setPlayer(json.data.player);
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

  function handleBack() {
    setView("all");
  }

  return (
    <main>
      {view === "details" ? (
        player ? (
          <div id="oneplay">
            <h3>{player.name}</h3>
            <section className="card">
              <p>{player.breed}</p>
              <p>{player.status}</p>
              <img id="img" src={player.imageUrl} alt={player.name} />
            </section>
            <button onClick={handleBack}>Back</button>
          </div>
        ) : (
          <div>
            <div>Loading...</div>
            {showTryAgain && (
              <div>
                <p>Oops! Taking longer than expected...</p>
                <button onClick={handleBack}>Back</button>
              </div>
            )}
          </div>
        )
      ) : (
        <AllPlayers />
      )}
    </main>
  );
}
export default SinglePlayer;
