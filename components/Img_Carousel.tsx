'use client'
//used to import react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//images to be used in the carousel
import Image from "next/image"; 
import Img1 from "@/public/images/cimg1.jpg";
import Img2 from "@/public/images/cimg2.jpg";
import Img3 from "@/public/images/cimg3.jpg";
import Img4 from "@/public/images/cimg4.jpg";
import Img5 from "@/public/images/cimg5.jpg";

import React, { Component } from "react";
import Slider from "react-slick";

function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      <div>
        <h3>
        <Image 
                src="/images/cimg1.jpg" 
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
    <div>hi</div>
    </div>
  );
}

export default PauseOnHover;
