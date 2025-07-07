import React from "react";
import StyleContent from "../LastSection/LastSection.module.scss";

const LastSection = () => {
  return (
    <div className={StyleContent.last_block}>
      <div className={StyleContent.blur_background}></div>
      <div className={StyleContent.block_text_center}>
        <p className={StyleContent.last_text}>The latest</p>
        <p className={StyleContent.large_last_text}>
          Buy a subscription! Only $4.49 for you.
        </p>
      </div>
      <div className={StyleContent.container_large}>
        <div className={StyleContent.best_subscribe}>
          <img
            src={`http://localhost:5000/api/images/MovieTicket.jpg`}
            className={StyleContent.background_image}
          />
          <div className={StyleContent.content}>
            <div className={StyleContent.emoji_wrapper}>
              <img
                src={`http://localhost:5000/api/images/Emoji_1.png`}
                className={StyleContent.emoji_style}
              />
            </div>
            <h2 className={StyleContent.title}>
              How many films did you watched in 2024?
            </h2>
            <p className={StyleContent.subtitle}>
              2024 was one of our busiest years yet; let's take a moment to
              celebrate it.
            </p>
            <div className={StyleContent.author}>
              <img
                src="http://localhost:5000/api/images/Michael_Jackson.jpg"
                className={StyleContent.avatar}
              />
              <div>
                <p className={StyleContent.name}>Michael Jackson</p>
                <p className={StyleContent.date}>January 31, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastSection;
