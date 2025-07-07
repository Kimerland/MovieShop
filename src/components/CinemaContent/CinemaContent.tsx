import React, { useEffect, useState } from "react";
import CinemaStyles from "../CinemaContent/CinemaContent.module.scss";
import { Link, useNavigate } from "react-router-dom";

export interface ICinema {
  id: string;
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Plot: string;
  imdbRating: number;
  Genre: string;
}

const CinemaContent = () => {
  const [randomMovies, setRandomMovies] = useState<ICinema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMovies, setShowMovies] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isSubscribed = Boolean(localStorage.getItem("subscription"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubscribed) {
      navigate("/cinema");
    } else {
      navigate("/subscribe");
      alert("You don't have subscription!");
    }
  }, [isSubscribed, navigate]);

  const handleRandom = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/movies/random");
      const newMovies = await response.json();

      setRandomMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setHasMore(newMovies.length === 8);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRandom();
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleRandom();
  };

  return (
    <div className={CinemaStyles.wrapper_cinema}>
      <div className={CinemaStyles.introduction_cinema}>
        <p className={CinemaStyles.watch_text}>Let's watch movies!</p>
        <button
          className={CinemaStyles.start_content}
          onClick={() => setShowMovies(true)}
        >
          <p className={CinemaStyles.start_btn}>GET STARTED</p>
        </button>
      </div>

      {showMovies && (
        <>
          <div className={CinemaStyles.movies_cards}>
            {randomMovies.map((movie: ICinema) => (
              <div key={movie.imdbID} className={CinemaStyles.movie_card}>
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450.png?text=No+Poster"
                    }
                    className={CinemaStyles.movie_poster}
                  />
                  <h3 className={CinemaStyles.movie_title}>{movie.Title}</h3>
                  <p className={CinemaStyles.movie_year}>{movie.Year}</p>
                </Link>
              </div>
            ))}
          </div>

          {hasMore && !loading && (
            <div className={CinemaStyles.show_content}>
              <button
                className={CinemaStyles.show_more}
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CinemaContent;
