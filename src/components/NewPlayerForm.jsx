import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayer } from "../API";

function AddNewPlayer({ players, setPlayers }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name || !breed) {
      alert("Name and breed are required.");
      return;
    }
    const playerData = { name, breed, imageUrl };
    try {
      const newPlayer = await addPlayer(playerData);
      console.log("API response:", newPlayer);
      setPlayers([...players, newPlayer.data.newPlayer]);
      navigate("/");
    } catch (error) {
      console.log("Error adding player:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label>Breed:</label>
      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
      />
      <br />
      <label>Picture (url):</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

export default AddNewPlayer;
