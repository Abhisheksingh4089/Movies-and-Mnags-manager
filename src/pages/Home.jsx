import Waves from "../Waves";
import NewsGrid from "../Components/NewsGrid";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
      
      {/* 🌊 Waves Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          lineColor="#74179f"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10">

        {/* Hero section */}
        <section className="h-[0vh] flex items-center px-10">

 
        </section>

        {/* 📰 NEWS GRID */}
        <NewsGrid />

      </div>
    </div>
  );
};

export default Home;
