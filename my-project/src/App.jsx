import React, { useEffect, useState } from "react";
import AddMovieForm from "./components/AddMovieForm";
import MyList from "./components/MyList";
import SeachSection from "./components/SeachSection";

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
      <AddMovieForm
        movieName={movieName}
        setMovieName={setMovieName}
        category={category}
        setCategory={setCategory}
        addMovie={addMovie}
      />
      <div>
        <MyList
          deleteMovies={deleteMovies}
          movies={movies}
          toggleWatched={toggleWatched}
        />
      </div>
      <div>
        <SeachSection
          setSearchQuery={setSearchQuery}
          searchMovie={searchMovie}
          isSearching={isSearching}
          searchResults={searchResults}
          addFromSearch={addFromSearch}
        />
      </div>
    </>
  );
};

export default App;
