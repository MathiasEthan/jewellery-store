import { defineQuery } from 'next-sanity'
import React from 'react'
import { sanityFetch } from '../sanity/live'
import { getCart } from './cartFunctions'
import Image from 'next/image'

async function Cart() {
  // Call getCart function and extract the cart array and string
  const { cart: productsIdArray, cartString } = await getCart();
  console.log("Cart array:", productsIdArray);
  console.log("Cart string for query:", cartString);
  
  // Only proceed if we have items in the cart
  if (productsIdArray.length > 0) {
    // Use the pre-formatted cartString in your query
    const queryString = `*[field == product && id in ${cartString}] {name, description, price, "imageUrl": image.asset->url}`;
    console.log(queryString)
    const CART_QUERY = defineQuery(queryString);
    
    try {
      const { data: products } = await sanityFetch({ query: CART_QUERY });
      console.log("Fetched products:", products);
      
      return (
        <div className="cart-list">
          {products?.map((product, id) => (
            <div key={id} className='flex-col p-2 m4'>
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{objectFit: 'cover' }} 
                  width={80}
                  height={80}
                />
              )}
              <div style={{ flex: 1 }}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div>
                ${product.price}
              </div>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error fetching cart products:", error);
      return <p>Error loading cart items.</p>;
    }
  } else {
    return <p>Your cart is empty.</p>;
  }
}

export default Cart;