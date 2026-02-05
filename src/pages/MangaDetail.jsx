import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MangaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [manga, setManga] = useState(null);
  const [cover, setCover] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch ALL chapters (pagination-safe)
  const fetchAllChapters = async (mangaId) => {
    let allChapters = [];
    let offset = 0;

    while (true) {
      const res = await axios.get(
        "https://api.mangadex.org/chapter",
        {
          params: {
            manga: mangaId,
            translatedLanguage: ["en"],
            order: { readableAt: "asc" }, // ✅ SAFE ordering
            limit: 100,                   // ✅ max allowed
            offset,
          },
        }
      );

      const batch = res.data.data;
      allChapters = [...allChapters, ...batch];

      if (batch.length < 100) break; // ✅ last page
      offset += 100;
    }

    return allChapters;
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // 📘 Fetch manga details + cover
        const mangaRes = await axios.get(
          `https://api.mangadex.org/manga/${id}`,
          {
            params: {
              includes: ["cover_art", "author", "artist"],
            },
          }
        );

        const mangaData = mangaRes.data.data;
        setManga(mangaData);

        // 🖼 Extract cover (correct way)
        const coverRel = mangaData.relationships.find(
          (rel) => rel.type === "cover_art"
        );

        if (coverRel) {
          setCover(
            `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}`
          );
        }

        // 📚 Fetch ALL chapters
        const allChapters = await fetchAllChapters(id);
        setChapters(allChapters);

      } catch (err) {
        console.error("Failed to load manga:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading || !manga) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  // 🧠 Safe data extraction
  const title =
    manga.attributes.title.en ||
    Object.values(manga.attributes.title)[0];

  const description =
    manga.attributes.description.en ||
    "No description available.";

  const status = manga.attributes.status;
  const year = manga.attributes.year;
  const rating = manga.attributes.contentRating;

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-10">

      {/* 📕 Poster (TOP CENTER) */}
      <div className="flex justify-center mb-8">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-60 aspect-[2/3] rounded-xl shadow-2xl"
          />
        ) : (
          <div className="w-60 aspect-[2/3] bg-gray-800 animate-pulse rounded-xl" />
        )}
      </div>

      {/* 🏷 Title */}
      <h1 className="text-3xl font-bold text-center mb-3">
        {title}
      </h1>

      {/* 📊 Meta */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 mb-6">
        {status && <span>Status: {status}</span>}
        {year && <span>Year: {year}</span>}
        {rating && <span>Rating: {rating}</span>}
        <span>Total Chapters: {chapters.length}</span>
      </div>

      {/* 📝 Description */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-gray-300 leading-relaxed text-center">
          {description}
        </p>
      </div>

      {/* 📚 Chapters */}
      <h2 className="text-2xl text-center mb-6">
        Chapters
      </h2>

      <div className="max-w-xl mx-auto space-y-3">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            onClick={() =>
        navigate(`/manga/${id}/chapter/${ch.id}`)
      }
            className="p-4 bg-black/40 rounded-lg hover:bg-black/60 cursor-pointer text-center"
          >
            Chapter {ch.attributes.chapter || "—"}{" "}
            {ch.attributes.title || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaDetail;
