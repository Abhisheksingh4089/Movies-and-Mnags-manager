import { useEffect, useState } from "react";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

const MovieModal = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetchTrailer();
  }, []);

  const fetchTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_KEY}`
    );
    const data = await res.json();

    const ytTrailer = data.results.find(
      v => v.type === "Trailer" && v.site === "YouTube"
    );

    setTrailer(ytTrailer);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-neutral-900 max-w-3xl w-full rounded-xl overflow-hidden relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>

        {/* Trailer */}
        {trailer && (
          <iframe
            className="w-full h-64"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
          />
        )}

        {/* Info */}
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            {movie.title}
          </h2>
          <p className="text-sm text-white/80">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
