import React from 'react'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/app/sanity/live'
import Image from 'next/image'

const PRODUCTS_QUERY = defineQuery(`*[field=="products" && type=="necklace"]{
  name, 
  price, 
  description,
  "imageUrl": image.asset->url
}`)

export default async function Necklaces(){
  const {data: products} = await sanityFetch({query: PRODUCTS_QUERY})
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-philosopher text-white mb-8 text-center">Necklaces</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <div key={product.name} className="bg-[#030D24] rounded-lg overflow-hidden shadow-lg">
            {product.imageUrl && (
              <div className="w-full h-64 relative">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-philosopher text-white mb-2">{product.name}</h2>
              <p className="text-gray-300 mb-3">${product.price}</p>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}