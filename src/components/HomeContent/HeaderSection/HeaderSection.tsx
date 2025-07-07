import React from "react";
import StyleContent from "../HeaderSection/HeaderSection.module.scss";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div className={StyleContent.home_text}>
      <div className={StyleContent.background_div}>
        <img
          src={`http://localhost:5000/api/images/people.jpg`}
          className={StyleContent.background_image}
        />
      </div>

      <h2 className={StyleContent.home_h2}>Discover the Magic of Cinema</h2>
      <p className={StyleContent.home_block_text}>
        Step into the world of storytelling, where every frame tells a tale.
        Whether it's the pulse-pounding action, heartwarming drama, or
        mind-bending sci-fi, movies have a way of capturing emotions and
        imagination like nothing else.
      </p>
      <button className={StyleContent.home_join_btn}>
        <Link className={StyleContent.home_join} to="/registration">
          JOIN
        </Link>
      </button>
    </div>
  );
};

export default HeaderSection;
