export async function fetchAllPlayers() {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players`
    );
    const json = await response.json();
    return json.data.players;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchPlayerById(id) {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players/${id}`
    );
    const json = await response.json();
    return json.data.player;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removePlayer(playerId) {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players/${playerId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    console.log(result);
    console.log(playerId);
    return result;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
}

export async function addPlayer(playerData) {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add player");
    }

    const json = await response.json();
    return json.data.player;
  } catch (error) {
    console.log(error);
  }
}
