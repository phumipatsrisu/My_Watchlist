import React from "react";
import { Link } from "react-router-dom";

const MyList = ({ movies, toggleWatched, deleteMovies }) => {
  return (
    <div>
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
              <Link className="bg-yellow-200" to={`/movie/${item.id}`}>
                Detail
              </Link>
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
  );
};

export default MyList;
