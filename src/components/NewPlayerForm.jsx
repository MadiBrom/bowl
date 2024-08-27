import React, { useState } from "react";

const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players";

function NewPlayerForm({ onPlayerAdded }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          breed,
          status,
          imageUrl,
        }),
      });
      const json = await response.json();
      if (onPlayerAdded) onPlayerAdded(json.data.player);
      setName("");
      setBreed("");
      setStatus("");
      setImageUrl("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Player</h2>
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
          value={name}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={name}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </label>
      <label>
        Picture:
        <input
          type="text"
          value={name}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
    </form>
  );
}
