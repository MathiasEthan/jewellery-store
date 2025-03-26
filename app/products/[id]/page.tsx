'use server'

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
  
  try {
    const { data: product } = await sanityFetch({ 
      query: PRODUCT_QUERY(id) 
    })
    
    // Log for debugging
    console.log(`Fetched product with ID ${id}:`, product)
    
    // Check if product exists
    if (!product) {
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-philosopher text mb-8 text-center">
            Product Not Found
          </h1>
          <p className="text-center text">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      )
    }
    
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto bg-[#030D24] rounded-lg overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2">
              {product.imageUrl ? (
                <div className="w-full h-96 relative">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name || "Product"} 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">No image available</p>
                </div>
              )}
            </div>
            
            <div className="p-8 md:w-1/2">
              <h1 className="text-3xl font-philosopher text mb-4">
                {product.name || "Unnamed Product"}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {product.price ? `$${product.price}` : "Price on request"}
              </p>
              
              <div className="mb-8">
                <h2 className="text-lg font-philosopher text mb-2">Description</h2>
                <p className="text-gray-400 text-sm">
                  {product.description || "No description available"}
                </p>
              </div>
              
              {(product.type || product.category) && (
                <div className="mb-8">
                  <p className="text-gray-300 mb-2">Category: 
                    <span className="text ml-2 capitalize">
                      {product.type || product.category}
                    </span>
                  </p>
                </div>
              )}
              
              <button className="w-full bg-blue-900 hover:bg-blue-800 text py-3 px-6 rounded-lg font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-philosopher text mb-8 text-center">
          Error Loading Product
        </h1>
        <p className="text-center text">Sorry, we couldn't load this product. Please try again later.</p>
      </div>
    )
  }
}