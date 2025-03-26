import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ot65f8vq",
  dataset: "production",
  apiVersion: '1',
  useCdn: false
});