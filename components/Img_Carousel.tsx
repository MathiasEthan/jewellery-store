'use client'

import Image from "next/image"; 
import Img1 from "@/public/images/cimg1.jpg";
import Img2 from "@/public/images/cimg2.jpg";
import Img3 from "@/public/images/cimg3.jpg";
import Img4 from "@/public/images/cimg4.jpg";
import Img5 from "@/public/images/cimg5.jpg";


function Img_Carousel() {
    return (
      <>
        <div className="carousel">
            <div className="carousel__container w-full h-auto max-h-64 object-cover">
                <div className="carousel_item">
                <Image 
                src="/images/cimg1.jpg" 
                alt="img1" 
                width={1200}   
                height={100}   
                layout="responsive"
                className="w-full h-auto max-h-130 object-cover"
                />
                </div>
                <div className="carousel_item">
                <Image 
                src={"/images/wideimg2.webp"} 
                alt="img2"
                width={1200}
                height={10}
                layout="responsive"
                className="w-full h-auto max-h-130 object-cover"
                />
                </div>
                <div className="carousel_item">
                <Image 
                src={Img3} 
                alt="img3"
                />
                </div>
                <div className="carousel_item">
                <Image 
                src={Img4} 
                alt="img4"
                />
                </div>
            </div>    
        </div>
      </>
    );
  }
  
  export default Img_Carousel;