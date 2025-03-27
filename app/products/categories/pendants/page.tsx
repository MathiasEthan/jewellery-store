import React from 'react'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/app/sanity/live'
import Image from 'next/image'

// Modified query with more flexible conditions and error handling
const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && type == "pendant" || category == "pendant"]{
  name, 
  price, 
  description,
  "imageUrl": image.asset->url
}`)

export default async function Pendants(){
  // Add error handling to the fetch
  try {
    const {data: products} = await sanityFetch({query: PRODUCTS_QUERY})
    
    // Add debugging statement
    console.log("Fetched products:", products)
    
    // Check if products exist and have items
    if (!products || products.length === 0) {
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-philosopher text-white mb-8 text-center">Pendants</h1>
          <p className="text-center text-white">No Pendants found. Check back soon!</p>
        </div>
      )
    }
    
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-philosopher text-white mb-8 text-center">Pendants</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.name || index} className="bg-[#030D24] rounded-lg overflow-hidden shadow-lg">
              {product.imageUrl ? (
                <div className="w-full h-64 relative">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name || "Pendant"} 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">No image available</p>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-philosopher text-white mb-2">{product.name || "Unnamed Product"}</h2>
                <p className="text-gray-300 mb-3">{product.price ? `$${product.price}` : "Price on request"}</p>
                <p className="text-gray-400 text-sm">{product.description || "No description available"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching Pendants:", error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-philosopher text-white mb-8 text-center">Pendants</h1>
        <p className="text-center text-white">Sorry, we couldn't load the Pendants. Please try again later.</p>
      </div>
    )
  }
}