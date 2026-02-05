import { useEffect, useState } from "react";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

export default function News() {
    

  const [movies, setMovies] = useState([]);
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchManga();
  }, []);

  async function fetchMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
    );
    const data = await res.json();
    setMovies(data.results.slice(0, 6));
  }

  async function fetchManga() {
    const res = await fetch(
      "https://api.mangadex.org/manga?limit=6&order[updatedAt]=desc"
    );
    const data = await res.json();
    setManga(data.data);
  }

  return (
    <section className="min-h-screen pt-24 px-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Latest Movies & Manga
      </h1>

      {/* Movies */}
      <h2 className="text-xl mb-4">🎬 Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 g mb-12">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white/10 rounded-xl p-4 rounded-xl">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="p-3 text-sm">{movie.title}</p>
          </div>
        ))}
      </div>

      {/* Manga */}
      <h2 className="text-xl mb-4">📚 Manga</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {manga.map(m => (
          <div key={m.id} className="bg-white/10 rounded-xl p-4 rounded-xl">
            <p className="text-sm">
              {m.attributes.title.en || "Manga Update"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
