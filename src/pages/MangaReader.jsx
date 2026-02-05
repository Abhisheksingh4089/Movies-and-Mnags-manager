import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MangaReader = () => {
  const { chapterId } = useParams();

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);

        // 📡 Get reader server
        const res = await axios.get(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );

        const { baseUrl, chapter } = res.data;
        const { hash, data } = chapter;

        // 🧩 Build full image URLs
        const imageUrls = data.map(
          (file) => `${baseUrl}/data/${hash}/${file}`
        );

        setPages(imageUrls);
      } catch (err) {
        console.error("Failed to load chapter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading chapter…
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {pages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Page ${index + 1}`}
            className="w-full object-contain rounded"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default MangaReader;
