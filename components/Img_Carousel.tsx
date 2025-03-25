'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Img1 from "@/public/images/cimg1.jpg";
import Img2 from "@/public/images/cimg2.jpg";
import Img3 from "@/public/images/cimg3.jpg";
import Img4 from "@/public/images/cimg4.jpg";
import Img5 from "@/public/images/cimg5.jpg";
import LArrow from "@/public/images/leftarrow.png";
import RArrow from "@/public/images/rightarrow.png";

import React, { useRef } from "react";
import Slider from "react-slick";

const PauseOnHover: React.FC = () => {
  // Create a ref to control the slider
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  // Handlers for custom arrows
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    // Outer container must be relative for absolute arrow positioning.
    <div className="slider-container relative">
      <Slider ref={sliderRef} {...settings}>
        <div>
          <h3>
            <Image
              src={Img1}
              alt="img1"
              width={1200}
              height={100}
              layout="responsive"
              className="w-full h-auto max-h-130 object-cover"
            />
          </h3>
        </div>
        <div>
          <h3>
            <Image
              src={"/images/wideimg2.webp"}
              alt="img2"
              width={1200}
              height={10}
              layout="responsive"
              className="w-full h-auto max-h-130 object-cover"
            />
          </h3>
        </div>
        <div>
          <h3>
            <Image
              src={Img3}
              alt="img3"
              width={1200}
              height={100}
              layout="responsive"
              className="w-full h-auto max-h-130 object-cover"
            />
          </h3>
        </div>
        <div>
          <h3>
            <Image
              src={Img4}
              alt="img4"
              width={1200}
              height={100}
              layout="responsive"
              className="w-full h-auto max-h-130 object-cover"
            />
          </h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>

      {/* Left arrow container spans full height with click handler */}
      <div
        onClick={handlePrev}
        className="absolute top-0 left-0 h-full w-15 flex items-center justify-center group cursor-pointer"
      >
        {/* Background overlay that appears on hover */}
        <div className="absolute inset-0 bg-[#e1e6ed] opacity-0 group-hover:opacity-15 transition-opacity"></div>
        {/* Always visible arrow image */}
        <Image
          src={LArrow}
          alt="Left Arrow"
          width={35}
          height={35}
          className="relative z-10"
        />
      </div>

      {/* Right arrow container spans full height with click handler */}
      <div
        onClick={handleNext}
        className="absolute top-0 right-0 h-full w-15 flex items-center justify-center group cursor-pointer"
      >
        <div className="absolute inset-0 bg-[#e1e6ed] opacity-0 group-hover:opacity-15 transition-opacity"></div>
        <Image
          src={RArrow}
          alt="Right Arrow"
          width={35}
          height={35}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default PauseOnHover;
