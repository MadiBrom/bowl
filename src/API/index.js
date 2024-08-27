export const fetchSinglePlayer = async (id) => {
  const response = await fetch(
    `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players/${id}`
  );
  const data = await response.json();
  return data.player;
};
