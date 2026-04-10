import React, { useEffect, useState } from "react";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("action");

  const [movies, setMovies] = useState(() => {
    const savedData = localStorage.getItem("myMovies");
    console.log(savedData);

    if (savedData) {
      return JSON.parse(savedData);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("myMovies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (!movieName) return;
    const newMovies = {
      id: Date.now(),
      name: movieName,
      category: category,
      watched: false,
    };
    setMovies([newMovies, ...movies]);
    setMovieName("");
  };

  const deleteMovies = (id) => {
    setMovies(movies.filter((item) => item.id !== id));
  };

  const toggleWatched = (id) => {
    const updatedMovies = movies.map((item) => {
      if (item.id == id) {
        return { ...item, watched: !item.watched };
      }
      return item;
    });
    setMovies(updatedMovies);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="ชื่อหนัง..."
          className="border m-1"
          onChange={(e) => setMovieName(e.target.value)}
          value={movieName}
        />
        <select
          name=""
          id=""
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

        <ul>
          {movies.map((item) => (
            <div className=" m-1" key={item.id}>
              <li className={item.watched ? "line-through text-gray-400" : ""}>
                <label>
                  <input
                    checked={item.watched}
                    type="checkbox"
                    onChange={() => toggleWatched(item.id)}
                  />
                </label>
                {item.name} {item.category}
                <button
                  onClick={() => deleteMovies(item.id)}
                  className="bg-red-400"
                >
                  delete
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
