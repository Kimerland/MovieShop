import React, { useEffect, useState } from "react";
import StyleSlider from "../SliderHome/SliderHome.module.scss";
import { Link } from "react-router-dom";

type Image = string;

const SliderHome = () => {
  const [images, SetImages] = useState<Image[]>([]);
  const [index, setIndex] = useState(0);

  const fetchPhotos = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/api/photos");
      const photos: Image[] = await response.json();
      SetImages(photos);
    } catch (error) {
      console.error("Error upload", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        images.length > 0 ? (prevIndex + 1) % images.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={StyleSlider.start_header}>
      <div className={StyleSlider.background_div}>
        {images.map((image: Image, id: number) => (
          <img
            key={id}
            src={`http://localhost:5000/api/photos/${image}`}
            className={`${StyleSlider.background_image} ${
              id === index ? StyleSlider.active : ""
            }`}
          />
        ))}
      </div>
      <div className={StyleSlider.start_content}>
        <p className={StyleSlider.start_title}>Discover Movies</p>
        <p className={StyleSlider.start_text}>
          Explore the latest and greatest films.
        </p>
        <button className={StyleSlider.start_btn}>
          <Link className={StyleSlider.start_btn_text} to="/registration">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SliderHome;
