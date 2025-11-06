import React, { useState } from 'react';
import API from '../api';
import '../styles/MovieForm.css'; 

export default function MovieForm(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [release_date, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) =>{
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('release_date', release_date);
    form.append('rating', rating);
    if(poster) form.append('poster', poster);

    setLoading(true);
    try{
      await API.post('movies/', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setTitle(''); setDescription(''); setReleaseDate(''); setRating(''); setPoster(null);
      window.dispatchEvent(new Event('movie:added'));
    }catch(err){
      console.error(err);
      alert('Error adding movie');
    }finally{
      setLoading(false);
    }
  }

  return (
    <form className="movie-form" onSubmit={submit}>
      <h2>Add Movie</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input type="date" value={release_date} onChange={e=>setReleaseDate(e.target.value)} />
      <input placeholder="Rating (e.g. 7.8)" value={rating} onChange={e=>setRating(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={e=>setPoster(e.target.files[0])} />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Movie'}</button>
    </form>
  );
}
