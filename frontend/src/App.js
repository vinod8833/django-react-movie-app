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
    <div className="app-container">
      <header>
        <h1><Link to="/">CineHorizon</Link></h1>
        <button
          className="add-movie-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Movie"}
        </button>
      </header>

      {showForm && <MovieForm />}

      <main>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>

      <style>{`
  .app-container {
    width: 95%;
    max-width: 1200px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #410109ff;
    background: #bbc9dfff;
    border-radius: 12px;
    padding: 30px 40px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }

  .app-container:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 2px solid #e0e0e0;
  }

  header h1 {
    font-size: 2.2rem;
    color: #850000ff;
    letter-spacing: 1px;
    cursor: default;
  }

  header a {
    text-decoration: none;
    color: inherit;
  }

 .add-movie-btn {
    padding: 6px 12px;
    background: linear-gradient(45deg, #0066ff, #00d4ff);
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    transition: all 0.3s ease;
  }

  .add-movie-btn:hover {
    background: linear-gradient(45deg, #004ec2, #00aaff);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 102, 255, 0.4);
  }

  main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
}

  .movie-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .movie-card:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  .movie-card p {
    padding: 0 15px 15px;
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }

  @media (max-width: 99298px) {
    main {
      grid-template-columns: repeat(3, 1fr); 
    }
  }

  @media (max-width: 480px) {
  main {
    grid-template-columns: 1fr;
  }
}

    .add-movie-btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
`}</style>

    </div>
  );
}

