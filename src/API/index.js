export async function API(id) {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-FT/players`
    );
    const json = await response.json();
    return json.data.player;
  } catch (error) {
    console.log("error");
  }
}
API;
