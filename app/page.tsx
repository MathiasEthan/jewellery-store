
import Img_Carousel from "@/components/Img_Carousel";
import Menu from "@/components/Menu";
import Customize_HP from "@/components/Customize_HP";
import Product_Types from "@/components/Product_Types";

export default async function Home() {

  return (
    <>
      <Img_Carousel />
      <Customize_HP />
      <Product_Types />
      <Menu />

    </>
  );
}

