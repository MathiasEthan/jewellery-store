'use client';

import { Button } from '@/components/ui/button';
import { addToCart } from '@/app/cart/cartFunctions';
import { useState } from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      console.log("Starting to add item:", productId);
      const result = await addToCart(productId);
      console.log("Result from server action:", result);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}