import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import ConfirmModal from "../components/ConfirmModal";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`movies/${id}/`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!movie)
    return (
      <div className="text-center py-12 text-2xl text-gray-300 animate-pulse">
        Loading movie details...
      </div>
    );

  const deleteMovie = async () => {
    try {
      await API.delete(`movies/${id}/`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#0d1117] to-[#1a1f29] text-white">

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this movie?"
          onConfirm={deleteMovie}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center 
                      bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-[450px] bg-gray-700 rounded-2xl flex items-center justify-center text-gray-300">
            No Poster Available
          </div>
        )}

        <div className="space-y-5">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            {movie.title}
          </h1>

          <p className="text-lg">
            <span className="text-yellow-300 font-semibold">Release Date:</span> {movie.release_date || "N/A"}
          </p>

          <p className="text-lg">
            <span className="text-yellow-300 font-semibold">Rating:</span> {movie.rating || "N/A"}
          </p>

          <p className="text-gray-300 leading-relaxed text-md">
            {movie.description}
          </p>

          <div className="pt-6 flex gap-4">
            <button
              onClick={() => setShowConfirm(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold
                         shadow-lg hover:shadow-red-600/50 transition duration-300">
              Delete Movie
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-xl font-semibold
                         shadow-lg hover:shadow-white/20 transition duration-300">
              Back to Movies
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
