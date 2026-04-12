import React from "react";

const seachSection = ({
  setSearchQuery,
  searchMovie,
  isSearching,
  searchResults,
  addFromSearch,
}) => {
  return (
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
  );
};

export default seachSection;
