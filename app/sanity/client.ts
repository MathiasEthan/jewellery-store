import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ot65f8vq",
  dataset: "production",
  apiVersion: '2025-03-27',
  useCdn: false
});