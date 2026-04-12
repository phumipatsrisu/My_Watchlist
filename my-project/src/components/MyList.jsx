import React from "react";

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
