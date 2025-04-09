import React from "react";

function MovieDetails({ movieId, onCloseMovie }) {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <p>{movieId}</p>
    </div>
  );
}

export default MovieDetails;
