import React from 'react'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/app/sanity/live'
import Image from 'next/image'

// Query to fetch a specific product by its Sanity document ID
const PRODUCT_QUERY = (id: string) => defineQuery(`*[field==products && id=="${id}"] {id,name,price,description,"imageUrl": image.asset->url}`)
// Use [0] to get the first (and should be only) result

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  
    const { data: product } = await sanityFetch({ 
      query: PRODUCT_QUERY(id) 
    })
    console.log(product.name)
    return (
      <div>
       test
      </div>
    )
}