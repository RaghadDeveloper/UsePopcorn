import React from "react";
import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({ watched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
