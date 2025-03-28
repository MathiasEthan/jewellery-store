import Img_Carousel from "@/components/Img_Carousel";
import AllProducts from "./products/page";
import Chatbot from "./components/Chatbot";

export default async function Home() {

  return (
    <>
      <Img_Carousel />
      <AllProducts />
      <Chatbot />
    </>
  );
}

