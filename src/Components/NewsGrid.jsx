import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "./MangaCard";
import MovieModal from "./MovieModal";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

const NewsGrid = () => {
  const [movies, setMovies] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchManga();
    fetchMovies();
  }, []);

  // 📚 Fetch latest manga (8 items)
  const fetchManga = async () => {
    try {
      const res = await axios.get("https://api.mangadex.org/manga", {
        params: {
          limit: 8,
          order: { updatedAt: "desc" },
          includes: ["cover_art"],
        },
      });

      setMangas(res.data.data);
    } catch (err) {
      console.error("Manga fetch error:", err);
    }
  };

  // 🎬 Fetch trending movies
  const fetchMovies = async () => {
    if (!TMDB_KEY) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 6));
    } catch (err) {
      console.error("Movie fetch error:", err);
    }
  };

  return (
    <section className="px-10 py-24 text-white">
         <div
    className="
      bg-black/70
      backdrop-blur-md
      rounded-3xl
      px-8 py-12
      shadow-2xl
    "
  >
      <h2 className="text-3xl font-bold mb-12">
        Latest Movies & Manga
      </h2>

      {/* 🎬 MOVIES SECTION */}
      <h3 className="mb-4 text-lg text-purple-300">🎬 Movies</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {movies.map(movie => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="
              flex flex-col items-center
                cursor-pointer
                transition
                hover:scale-105
            "
          >
          <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="  w-full
                    aspect-[2/3]
                    object-contain
                    rounded-lg
                    shadow-lg
                    bg-black
            "
          />

            <p className="p-3 text-sm text-center">
              {movie.title}
            </p>
          </div>
        ))}
      </div>

      {/* 📚 MANGA SECTION */}
      <h3 className="mb-4 text-lg text-purple-300">📚 Manga</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mangas.map(manga => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>

      {/* 🎥 MOVIE MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </div>
    </section>

  );
};

export default NewsGrid;
