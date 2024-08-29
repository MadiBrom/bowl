import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayer } from "../API";

function AddNewPlayer() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const playerData = {
      name,
      breed,
      imageUrl,
    };

    try {
      const newPlayer = await addPlayer(playerData);
      setPlayers([...players, newPlayer]);
      navigate("/");
    } catch (error) {
      console.log(error);
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
