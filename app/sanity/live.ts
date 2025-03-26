'use server'

import { defineLive } from "next-sanity";
import {client} from "@/app/sanity/client"

export const {sanityFetch, SanityLive} = defineLive({
    client: client.withConfig({ apiVersion: "vX" })
})