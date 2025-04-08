import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Search from "./Components/Search";
import Result from "./Components/Result";
import Box from "./Components/Box";
import Summary from "./Components/Summary";
import WatchedMoviesList from "./Components/WatchedMoviesList";
import MoviesList from "./Components/MoviesList";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "cc9b8459";
// const KEY = "cc9bklnlxc";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "interstellar";

  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error("Movie Not Found!");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        console.log(data);
        setMovies(data.Search);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Search />
        <Result movies={movies} />
      </Navbar>

      <Main>
        {/* <Box element={<MoviesList movies={movies} />} /> */}
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MoviesList movies={movies} />
          )}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
