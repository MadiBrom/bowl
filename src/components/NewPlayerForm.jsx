import React, { useState } from "react";
import { addPlayer } from "../API";

function AddNewPlayer({ players, setPlayers }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("active");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newPlayer = { name, breed, imageUrl };
      await addPlayer(newPlayer);
      setName("");
      setBreed("");
      setImageUrl("");
      setStatus("active");
      // Refresh the list of players
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default AddNewPlayer;
