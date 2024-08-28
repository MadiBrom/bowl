import React from "react";

function SearchComp({ onSearch }) {
  function handleInputChange(event) {
    onSearch(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search players..."
      onChange={handleInputChange}
    />
  );
}

export default SearchComp;
