import { useState } from "react";
// component
import Navbar from "./component/Navbar";
import Logo from "./component/Logo";
import Search from "./component/Search";
import Loader from "./component/Loader";
import ErrorMessage from "./component/ErrorMessage";
import NumResults from "./component/NumResults";
import Main from "./component/Main";
import Box from "./component/Box";
import MoviesList from "./component/MoviesList";
import MoviesDetails from "./component/MoviesDetails";
import WatchSummary from "./component/WatchSummary";
import WatchedMoviesList from "./component/WatchedMoviesList";

import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // event handler
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movies) => movies.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search setQuery={setQuery} query={query} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {!isLoading && !error && (
            <MoviesList movies={movies} onClickMovie={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MoviesDetails
              selectedId={selectedId}
              onClickClose={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
