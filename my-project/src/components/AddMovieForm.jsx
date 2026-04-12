import React from "react";

const AddMovieForm = ({
  movieName,
  setMovieName,
  category,
  setCategory,
  addMovie,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="ชื่อหนัง..."
        className="border m-1"
        onChange={(e) => setMovieName(e.target.value)}
        value={movieName}
      />
      <select
        className="border"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="action">action</option>
        <option value="fantacy">fantacy</option>
        <option value="drama">drama</option>
      </select>
      <button className="bg-blue-200" onClick={addMovie}>
        Add Movie
      </button>
    </div>
  );
};

export default AddMovieForm;
