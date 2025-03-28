'use client';

import { defineQuery } from 'next-sanity'
import React, { useState, useEffect } from 'react'
import { sanityFetch } from '../sanity/live'
import { getCart } from './cartFunctions'
import Image from 'next/image'
import DeliveryMapSection from '../components/DeliveryMapSection'
import PaymentPopup from '../components/PaymentPopup'

// Define product type
interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Client component for the cart
export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { cart: productsIdArray, cartString } = await getCart();
        
        if (productsIdArray.length > 0) {
          const queryString = `*[field == product && id in ${cartString}] {name, description, price, "imageUrl": image.asset->url}`;
          const CART_QUERY = defineQuery(queryString);
          
          const { data: fetchedProducts } = await sanityFetch({ query: CART_QUERY });
          setProducts(fetchedProducts);
          
          // Calculate total price
          const calculatedTotal = fetchedProducts.reduce((sum: number, product: Product) => sum + product.price, 0);
          setTotal(calculatedTotal);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading cart...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error loading cart items</h2>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-4">Add some beautiful jewellery to your cart</p>
          <a href="/products" className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {products?.map((product: Product, id: number) => (
              <div key={id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                {product.imageUrl && (
                  <div className="flex-shrink-0">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="rounded-md object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>
                <div className="ml-6">
                  <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setShowPayment(true)}
              className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        <DeliveryMapSection />
      </div>

      {showPayment && (
        <PaymentPopup 
          amount={total} 
          onClose={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
}