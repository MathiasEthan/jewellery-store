import { defineQuery } from "next-sanity";
import { sanityFetch } from "./sanity/live";
import Img_Carousel from "@/components/Img_Carousel";
import Menu from "@/components/Menu";

const PRODUCTS_QUERY = defineQuery(`*[field==product]{name, description, image}`)

export default async function Home() {
  const {data: products} = await sanityFetch({query: PRODUCTS_QUERY});
  return (
    <>
      <Img_Carousel />
        
      <Menu />
    </>
  );
}

