import React, { useEffect, useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("action");

  // fn
  const searchMovie = async () => {
    try {
      setIsSearching(true);
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`,
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSearching(false);
    }
  };

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

  const addFromSearch = (searchedName, searchedCategory) => {
    const newMovie = {
      id: Date.now(),
      name: searchedName,
      category: searchedCategory || "Other",
      watched: false,
    };
    setMovies([newMovie, ...movies]);
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
                {item.name} - {item.category}
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
      <div>
        <input
          type="text"
          placeholder="ค้นหาซีรีส์..."
          className="border m-1"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-red-400" onClick={searchMovie}>
          ค้นหา
        </button>
        {isSearching ? (
          <p>loding...</p>
        ) : (
          <ul>
            {searchResults.map((item) => (
              <li key={item.show.id}>
                {item.show.name} - {item.show.genres[0]}
                <button
                  className="bg-green-300 ml-4 px-2 rounded"
                  onClick={() =>
                    addFromSearch(item.show.name, item.show.genres[0])
                  }
                >
                  + เพิ่มลงลิสต์
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
