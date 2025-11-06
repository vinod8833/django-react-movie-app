import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import '../styles/MovieList.css'; 


export default function MovieList(){
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const fetchMovies = async (p=1) => {
    try{
      const res = await API.get(`movies/?page=${p}`);
      setMovies(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
      setPage(p);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchMovies(1);
  },[]);

  useEffect(()=>{
    const handler = () => fetchMovies(1);
    window.addEventListener('movie:added', handler);
    return () => window.removeEventListener('movie:added', handler);
  },[]);

  return (
    <div className="movie-list">
      <h2>Movies</h2>
      <div className="grid">
        {movies.map(m => (
          <div className="card" key={m.id}>
            <Link to={`/movie/${m.id}`}>
              {m.poster ? <img src={m.poster} alt={m.title} /> : <div className="placeholder">No Image</div>}
              <h3>{m.title}</h3>
            </Link>
            <p>Rating: {m.rating || 'N/A'}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => fetchMovies(page - 1)} disabled={!prev}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => fetchMovies(page + 1)} disabled={!next}>Next</button>
      </div>
    </div>
  )
}
