import { useState, useEffect } from "react";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5001/genres")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        return response.json();
      })
      .then((data) => {
        setGenres(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        setError("Failed to load genres");
        setLoading(false);
      });
  }, []);

  const handleGenreChange = async (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    setMovies([]); // Clear previous movie list

    if (genre) {
      fetch(`http://127.0.0.1:5001/movies?genre=${encodeURIComponent(genre)}`)
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error fetching movies:", error));
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Select a Genre</h1>

      {loading ? (
        <p>Loading genres...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <select
            onChange={handleGenreChange}
            className="border p-2 rounded mb-4 w-full text-black"
            value={selectedGenre}
          >
            <option value="">-- Select Genre --</option>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))
            ) : (
              <option disabled>No genres available</option>
            )}
          </select>

          {movies.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mt-4">Movies in {selectedGenre}</h2>
              <ul className="mt-2">
                {movies.map((movie, index) => (
                  <li key={index} className="border-b py-2">
                    <strong>{movie.title}</strong> - ⭐ {movie.vote_average} ({movie.vote_count} votes)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
