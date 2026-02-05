import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "../Components/MangaCard";

const Manga = () => {
  const [mangas, setMangas] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const LIMIT = 12;

  useEffect(() => {
    const fetchManga = async () => {
      const res = await axios.get(
        "https://api.mangadex.org/manga",
        {
          params: {
            limit: LIMIT,
            offset,
            title: search || undefined,
          },
        }
      );

      setMangas((prev) =>
        search ? res.data.data : [...prev, ...res.data.data]
      );
    };

    fetchManga();
  }, [offset, search]);

  return (
    <div className="min-h-screen bg-neutral-900 px-10 py-8">
      <h1 className="text-3xl text-white mb-6 text-center">
        Manga Library
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search manga..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOffset(0);
            setMangas([]);
          }}
          className="
            w-full max-w-md
            px-4 py-2
            rounded-full
            bg-black/40
            border border-white/20
            text-white
            outline-none
            focus:border-purple-500
          "
        />
      </div>

      {/* Manga Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>

      {/* Load more */}
      {!search && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setOffset(offset + LIMIT)}
            className="px-6 py-2 bg-purple-600 text-white rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Manga;
