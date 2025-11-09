import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowForm(false);
  }, [location]);

  return (
<div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-gray-900 font-sans">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-lg bg-black/30 backdrop-blur-md sticky top-0 z-10">
        
        <h1 className="text-3xl font-bold tracking-wide">
<Link to="/" className="bg-gradient-to-r from-red-900 via-red-800 to-black bg-clip-text text-transparent hover:opacity-90 transition">
            CineHorizon
          </Link>
        </h1>

        <button className="px-5 py-2 rounded-lg text-white font-semibold shadow-lg transition
            bg-gradient-to-r from-[#7a0000] via-[#b30000] to-[#330000]
            hover:scale-105 hover:shadow-red-600/50 duration-300"

          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Movie"}
        </button>
      </header>

      {/* Movie Form Toggle */}
      {showForm && (
        <div className="p-6">
          <MovieForm />
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>

    </div>
  );
}
