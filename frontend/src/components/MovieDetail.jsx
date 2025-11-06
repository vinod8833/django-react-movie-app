import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/MovieDetail.css';

export default function MovieDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(()=>{
    const load = async () =>{
      try{
        const res = await API.get(`movies/${id}/`);
        setMovie(res.data);
      }catch(err){ 
        console.error(err);
      }
    };
    load();
  },[id]);

  if(!movie) return <div>Loading...</div>;

  const deleteMovie = async () =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if(!confirmDelete) return;

    try{
      await API.delete(`movies/${id}/`);
      navigate("/"); 
    }catch(err){
      console.error(err);
      alert("Error deleting movie");
    }
  };

    return (
    // <div className="movie-detail">
    //   {movie.poster && <img src={movie.poster} alt={movie.title} />}
    //   <h2>{movie.title}</h2>
    //   <p><strong>Release date:</strong> {movie.release_date || 'N/A'}</p>
    //   <p><strong>Rating:</strong> {movie.rating || 'N/A'}</p>
    //   <p>{movie.description}</p>
    

    //   <button className="delete-btn" onClick={deleteMovie}>
    //     Delete Movie
    //   </button>

    // </div>
    <div className="movie-detail">
  {movie.poster && <img src={movie.poster} alt={movie.title} />}

  <div className="movie-info">
    <h2>{movie.title}</h2>
    <p><strong>Release date:</strong> {movie.release_date || 'N/A'}</p>
    <p><strong>Rating:</strong> {movie.rating || 'N/A'}</p>
    <p>{movie.description}</p>

    <button className="delete-btn" onClick={deleteMovie}>
      Delete Movie
    </button>
  </div>
</div>

  );
}


