import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICinema } from "../CinemaContent";
import WatchStyles from "../WatchFilms/WatchFilms.module.scss";

const WatchFilms = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<ICinema | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/movies/info/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    if (!movie?.Title) return;
    fetch(
      `http://localhost:5000/api/movies/trailer?title=${encodeURIComponent(
        movie.Title
      )}`
    )
      .then((res) => res.json())
      .then((data) => setVideoId(data.videoId));
  }, [movie?.Title]);

  return (
    <main className={WatchStyles.wrapper_watch}>
      {movie ? (
        <>
          <div className={WatchStyles.trailer_container}>
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            ) : (
              <p>We don't have trailer</p>
            )}
          </div>

          <div className={WatchStyles.movie_info}>
            <div className={WatchStyles.raiting_container}>
              <span className={WatchStyles.movie_watch}>
                ⭐ {movie.imdbRating}
              </span>
              <p className={WatchStyles.year_watch}>{movie.Year}</p>
            </div>

            <p className={WatchStyles.title_watch}>{movie.Title}</p>
            <p className={WatchStyles.plot_watch}>{movie.Plot}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default WatchFilms;
