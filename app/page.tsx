import { defineQuery } from "next-sanity";
import { sanityFetch } from "./sanity/live";

import Header from "@/components/Header";
import Img_Carousel from "@/components/Img_Carousel";
import Menu from "@/components/Menu";


export default async function Home() {
  const {data: products} = await sanityFetch({query: EVENTS_QUERY});
  return (
    <>
      <Img_Carousel />
      <Menu />
    </>
  );
}

