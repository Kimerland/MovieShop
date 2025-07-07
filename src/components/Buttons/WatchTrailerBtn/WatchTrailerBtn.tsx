import { useState, useEffect } from "react";
import React from "react";
import TrailerStyles from "../WatchTrailerBtn/WatchTrailerBtn.module.scss";
import { ICinema } from "../../CinemaContent/CinemaContent";

const WatchTrailerBtn = ({ movie }: { movie: ICinema }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

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

  const openTrailer = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    } else {
      alert("No trailer available!");
    }
  };

  return (
    <button onClick={openTrailer} className={TrailerStyles.trailer_btn}>
      Watch Trailer
    </button>
  );
};

export default WatchTrailerBtn;
