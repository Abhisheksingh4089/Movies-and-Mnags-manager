import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Manga from "./pages/Manga";
import MangaDetail from "./pages/MangaDetail";
import MangaReader from "./pages/MangaReader";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
     <div className="pt-16">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/manga/:mangaId/chapter/:chapterId" element={<MangaReader />}/>
      
      </Routes>
     </div>
    
    </BrowserRouter>
  );
};

export default App;
