import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "cc9b8459";

function MovieDetails({ movieId, onCloseMovie, onAddWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  // const [avgRating, setAvgRating] = useState(0);

  // const isWatched = watched.some((movie) => movie.imdbID === movieId);
  // const isWatched = watched.find((movie) => movie.imdbID === movieId);
  const isWatched = watched?.map((movie) => movie.imdbID).includes(movieId);
  const watchedUserRating = watched?.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster: String(poster),
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: imdbRating,
      userRating,
      count: countRef.current,
    };

    onAddWatch(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useEffect(
    function () {
      async function fetchMovie() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      fetchMovie();
    },
    [movieId]
  );

  useEffect(
    function () {
      if (title) document.title = `MOVIE | ${title}`;

      return function () {
        document.title = "popCorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code == "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {movie && (
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
                {/* <p>{avgRating}</p> */}
              </div>
            </header>
          )}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} setUserRating={setUserRating} />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} 🌟</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
