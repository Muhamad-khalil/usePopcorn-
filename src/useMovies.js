import { useEffect, useState } from "react";
const key = "f18cbd90";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();

      async function fitchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("something went wrong with fitch data movies ");

          const data = await res.json();

          if (data.Response === "False") throw new Error("movies not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fitchMovies();

      return () => {
        controller.abort();
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );
  return { movies, isLoading, error };
}
