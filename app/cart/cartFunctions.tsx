'use server';

import { cookies } from 'next/headers';

export async function addToCart(cartId: string) {
  const cartCookie = cookies().get('cart')?.value;
  let cart: string[] = cartCookie ? JSON.parse(cartCookie) : [];
  
  // Check if the item is already in cart to avoid duplicates
  if (!cart.includes(cartId)) {
    cart.push(cartId);
    cookies().set('cart', JSON.stringify(cart));
  }
  
  return { success: true, cartLength: cart.length, cartElements: cart };
}

export async function getCart() {
  const cartCookie = cookies().get('cart')?.value;
  const cart: string[] = cartCookie ? JSON.parse(cartCookie) : [];
  
  console.log("Fetching cart:", cart);
  
  // Convert the array to a Sanity-compatible format
  const cartString = cart.length > 0 ? '[' + cart.map(id => `"${id}"`).join(',') + ']' : '[]';
  
  return { 
    cart,
    cartString,
    isEmpty: cart.length === 0 
  };
}