function NavBar({ setSearchParams }) {
  return (
    <>
      <div className="search">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="Search for player"
            onChange={(e) =>
              setSearchParams(e.target.value.toLocaleLowerCase())
            }
          ></input>
        </label>
      </div>
      <br />
    </>
  );
}

export default NavBar;
