import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MangaCard = ({ manga }) => {
  const navigate = useNavigate(); // ✅ MOVE HERE

  const [cover, setCover] = useState(null);

  const mangaId = manga.id;
  const title =
    manga.attributes.title.en ||
    Object.values(manga.attributes.title)[0];

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await axios.get(
          `https://api.mangadex.org/cover?manga[]=${mangaId}`
        );

        const fileName = res.data.data[0].attributes.fileName;

        setCover(
          `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCover();
  }, [mangaId]);

  return (
    <div
      onClick={() => navigate(`/manga/${mangaId}`)}
      className="relative rounded-xl overflow-hidden bg-black/40 group cursor-pointer"
    >
      {/* 🔮 Blurred background */}
      {cover && (
        <img
          src={cover}
          alt=""
          className="
            absolute inset-0
            w-full h-full
            object-cover
            blur-lg scale-110
          "
        />
      )}

      {/* 🖤 Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 📕 Foreground poster */}
      <div className="relative z-10 flex justify-center p-4">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="
              w-full max-w-[180px]
              aspect-[2/3]
              object-contain
              rounded-md
              shadow-xl
              group-hover:scale-105
              transition-transform
              duration-300
            "
          />
        ) : (
          <div className="w-[180px] aspect-[2/3] bg-gray-800 animate-pulse" />
        )}
      </div>

      {/* 📄 Title */}
      <div className="relative z-10 px-4 pb-4 text-white">
        <h3 className="text-base font-semibold leading-snug line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default MangaCard;
