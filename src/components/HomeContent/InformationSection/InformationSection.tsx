import React from "react";
import StyleContent from "../InformationSection/InformationSection.module.scss";

const InformationSection = () => {
  return (
    <div className={StyleContent.information_block}>
      <div className={StyleContent.top_block}>
        <img
          src={`http://localhost:5000/api/images/watching.png`}
          className={StyleContent.background_image}
        />
      </div>

      <div className={StyleContent.bottom_block}>
        <img
          src={`http://localhost:5000/api/images/1984-Movies.jpg`}
          className={StyleContent.background_image}
        />
      </div>
    </div>
  );
};

export default InformationSection;
