import React from "react";
import StyleContent from "../SliderHomeContent/SliderHomeContent.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const reviews = [
  {
    text: "Accidentally got addicted to MovieLand, oops.",
    name: "Amber Nicole",
    role: "Coder",
    img: `http://localhost:5000/api/images/Helen.jpg`,
  },
  {
    text: "Yep, I just a dog but can draw design for project!",
    name: "Just Dog",
    role: "Designer",
    img: `http://localhost:5000/api/images/Dog.jpg`,
  },
  {
    text: "Amazing experience, loved working with MovieLand!",
    name: "Bill Gates",
    role: "Product Manager",
    img: `http://localhost:5000/api/images/BillGates.jpg`,
  },
];

const SliderHomeContent = () => {
  return (
    <div className={StyleContent.slider_container}>
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        grabCursor={false}
        allowTouchMove={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000 }}
        className={StyleContent.review_slider}
      >
        {reviews.map((reviews, index) => (
          <SwiperSlide key={index} className={StyleContent.review_card}>
            <p className={StyleContent.review_text}>{reviews.text}</p>
            <img src={reviews.img} className={StyleContent.avatar} />
            <h4>{reviews.name}</h4>
            <p>{reviews.role}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHomeContent;
