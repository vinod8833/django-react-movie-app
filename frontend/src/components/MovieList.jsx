import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const fetchMovies = async (p = 1) => {
    try {
      const res = await API.get(`movies/?page=${p}`);
      setMovies(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
      setPage(p);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    const handler = () => fetchMovies(1);
    window.addEventListener('movie:added', handler);
    return () => window.removeEventListener('movie:added', handler);
  }, []);

  return (
    <div className="min-h-screen px-6">

      <h2 className="text-2xl font-bold mb-2 text-left bg-gradient-to-r from-red-800 to-orange-400 text-transparent bg-clip-text">
        Movies Catalog
      </h2>

      {/* Movie Card Grid */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {movies.map(m => (
    <div key={m.id} 
            className="rounded-xl bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                    <Link to={`/movie/${m.id}`}>
        {m.poster ? (
          <img src={m.poster} alt={m.title} className="w-full h-56 object-cover rounded-t-xl" />
        ) : (
          <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600 rounded-t-xl">
            No Image
          </div>
        )}
<h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-900 via-red-800 bg-clip-text text-transparent text-center">
  {m.title}
</h3>
      </Link>
<p className="text-center font-semibold">
  Rating: <span className="text-red-600">{m.rating || "N/A"}</span>
</p>


    </div>
  ))}
</div>
      {/* Pagination */}
 <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => prev && fetchMovies(page - 1)}
          disabled={!prev}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            prev ? 'bg-gray-800 hover:bg-black shadow-md' : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-semibold text-white">Page {page}</span>

        <button
          onClick={() => next && fetchMovies(page + 1)}
          disabled={!next}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            next ? 'bg-gray-800 hover:bg-black shadow-md' : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>


    </div>
  );
}



 