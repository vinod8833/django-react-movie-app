import React, { useState } from 'react';
import API from '../api';

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
    <form 
      className="max-w-xl mx-auto p-6 bg-white/90 rounded-2xl shadow-2xl border border-yellow-600 backdrop-blur-md"
      onSubmit={submit}
    >
      {/* <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent mb-4 tracking-wide"> */}
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#5a0f0f] via-[#7b1111] to-[#a31621] bg-clip-text text-transparent mb-4 tracking-wide">

        Add Movie
      </h2>

      <input 
        className="w-full p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
        placeholder="Title"
        value={title}
        onChange={e=>setTitle(e.target.value)}
        required
      />

      <input 
        type="date"
        className="w-full p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
        value={release_date}
        onChange={e=>setReleaseDate(e.target.value)}
      />

      <input 
        className="w-full p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
        placeholder="Rating (e.g. 7.8)"
        value={rating}
        onChange={e=>setRating(e.target.value)}
      />

      <textarea 
        className="w-full p-3 mb-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition h-28"
        placeholder="Description"
        value={description}
        onChange={e=>setDescription(e.target.value)}
      />

      <input 
        type="file"
        accept="image/*"
        className="w-full p-2 mb-4 border border-gray-400 rounded-lg bg-white cursor-pointer"
        onChange={e=>setPoster(e.target.files[0])}
      />

      <button 
        type="submit" 
        disabled={loading}
        // className="w-full py-3 rounded-lg font-semibold text-white transition 
        //            bg-gradient-to-r from-gray-900 to-black hover:opacity-90 disabled:opacity-50 shadow-md">

        className="w-full py-3 rounded-xl font-bold text-white text-lg transition-all
           bg-gradient-to-r from-[#5a0f0f] via-[#7b1111] to-[#a31621]
           hover:from-[#7b1111] hover:via-[#a31621] hover:to-[#d41b2b]
           shadow-lg shadow-[#7b1111]/50 hover:shadow-2xl hover:shadow-[#a31621]/70
           disabled:opacity-50 disabled:cursor-not-allowed">



        {loading ? 'Adding...' : 'Add Movie'}
      </button>
    </form>
  );
}

