import React from 'react'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/app/sanity/live'
import Image from 'next/image'
import Link from 'next/link'

// Query to fetch all products
const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "product"]{
  name, 
  price, 
  description,
  type,
  category,
  "imageUrl": image.asset->url
}`)

export default async function AllProducts() {
  try {
    const {data: products} = await sanityFetch({query: ALL_PRODUCTS_QUERY})
    
    console.log("Fetched all products:", products)
    
    if (!products || products.length === 0) {
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-philosopher text mb-8 text-center">All Products</h1>
          <p className="text-center text">No products found. Check back soon!</p>
        </div>
      )
    }

    // Group products by type for better organization
    const groupedProducts = products.reduce((acc, product) => {
      const category = product.type || product.category || 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    }, {})
    
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-philosopher text mb-8 text-center">All Products</h1>
        
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-philosopher text mb-6 capitalize">
              {category}s
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product, index) => (
                <div key={product.name || index} className="bg-[#030D24] rounded-lg overflow-hidden shadow-lg">
                  {product.imageUrl ? (
                    <div className="w-full h-64 relative">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name || "Product"} 
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
                    <h3 className="text-xl font-philosopher text mb-2">
                      {product.name || "Unnamed Product"}
                    </h3>
                    <p className="text-gray-300 mb-3">
                      {product.price ? `$${product.price}` : "Price on request"}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      {product.description || "No description available"}
                    </p>
                    <Link href={`/products/${product.type || product.category || 'other'}`}>
                      <button className="bg-blue-900 hover:bg-blue-800 text py-2 px-4 rounded w-full">
                        View Collection
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-philosopher text mb-8 text-center">All Products</h1>
        <p className="text-center text">Sorry, we couldn't load the products. Please try again later.</p>
      </div>
    )
  }
}