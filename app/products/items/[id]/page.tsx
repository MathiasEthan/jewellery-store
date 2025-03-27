import React from 'react'
import { Button } from '@/components/ui/button'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/app/sanity/live'
import Image from 'next/image'

export default async function ProductDetailPage({params}: {params: {id: string}}) {
  const { id } = await params
  console.log('Product ID:', id)
  
  // Use proper GROQ syntax with a string parameter
  const queryString = `*[field == product && id =="${id}"] {name, description, price, "imageUrl": image.asset->url}`
  console.log('Query:', queryString)
  
  const productQuery = defineQuery(queryString, {params: {id}})
  const product = await sanityFetch({query: productQuery})
  
  console.log('Product data:', product.data[0].name)
  
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-9">
        {product.data[0] ? (
          <div className="md:flex">
        <div className="md:w-1/2">
          {product.data[0].imageUrl && (
            <Image 
              className="w-full h-96 object-cover object-center" 
              src={product.data[0].imageUrl} 
              alt={product.data[0].name}
              width={800}
              height={600}
            />
          )}
        </div>
        <div className="p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.data[0].name}</h1>
          <p className="text-gray-600 mb-6">{product.data[0].description}</p>
          <div className="text-2xl font-bold text-gray-900">
          ₹ {product.data[0].price?.toFixed(2) || 'Price unavailable'}
          </div>
          <div className="mt-8 space-y-4">
            <Button 
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Buy Now
            </Button>
            <Button 
              className="w-full border border-black text-white py-3 px-6 rounded-md hover:bg-gray-100 hover:text-black transition duration-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>
          </div>
        ) : (
          <div className="p-8 text-center">
        <p>Product not found</p>
          </div>
        )}
      </div>
    </div>
  )
}