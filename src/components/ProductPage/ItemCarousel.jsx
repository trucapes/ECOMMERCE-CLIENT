import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

//Props will be the object of item to be displayed----------------

export default function ItemCarousel({ props }) {
  return (
    <>
      <div className="w-fit grid place-items-center">
        <div className="w-[400px] flex flex-row">
          <button className="previousBtn text-xl p-1">
            <IoIosArrowBack />
          </button>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{
              clickable: false,
            }}
            navigation={{ prevEl: ".previousBtn", nextEl: ".nextBtn" }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide className="m-0">
              <div>
                <img
                  src="https://www.integral-lighting.com/wp-content/uploads/2023/01/MG_6312-Chris-Hartman-scaled-1100x850.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="m-0">
              <div>
                <img
                  src="https://www.integral-lighting.com/wp-content/uploads/2023/01/MG_6312-Chris-Hartman-scaled-1100x850.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="m-0">
              <div>
                <img
                  src="https://www.integral-lighting.com/wp-content/uploads/2023/01/MG_6312-Chris-Hartman-scaled-1100x850.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="m-0">
              <div>
                <img
                  src="https://www.integral-lighting.com/wp-content/uploads/2023/01/MG_6312-Chris-Hartman-scaled-1100x850.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <button className="nextBtn text-xl p-1">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
