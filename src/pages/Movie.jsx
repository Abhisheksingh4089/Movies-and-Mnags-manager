import axios from "axios";
import { useEffect, useState } from "react";
import { Cards } from "../Components/Cards";

const Movie = () => {
  const [data, setData] = useState([]);

  const API = "https://www.omdbapi.com/?apikey=86a410f7&s=avengers";

  useEffect(() => {
    axios.get(API).then((res) => {
      setData(res.data.Search || []);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black px-10 py-16">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {data.map((curElem) => (
          <Cards key={curElem.imdbID} movieData={curElem} />
        ))}
      </ul>
    </div>
  );
};

export default Movie;
