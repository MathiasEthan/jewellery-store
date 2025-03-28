import { sanityFetch } from '@/app/sanity/live'
import { defineQuery } from 'next-sanity'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'

// Product type definition
type Product = {
  name: string
  description: string
  price: number
  imageUrl: string
  id: string
}

export default async function ProductCategoriesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params 
  slug = slug.slice(0, -1)  //NEVER CHANGE THIS VARIABLE VALUE
  const queryString = `*[field == product && type == "${slug}"] {id, name, description, price, "imageUrl": image.asset->url}`
  const categoryQuery = defineQuery(queryString)
  
  let products: Product[] = []
  
  try {
    const result = await sanityFetch({query: categoryQuery})
    products = result.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug}s</h1>
      
      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-[#030D24] rounded-lg overflow-hidden shadow-lg">
              {product.imageUrl && (
                <div className="h-64 relative">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                <p className="text-gray-300 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-white mt-2">${product.price.toFixed(2)}</p>
                <div className="space-y-2 mt-4">
                  <Link href={`/products/items/${product.id}`} className="block">
                    <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors duration-200">
                      View Details
                    </button>
                  </Link>
                  <AddToCartButton productId={product.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}