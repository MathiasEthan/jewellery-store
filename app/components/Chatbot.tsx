'use client';

import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { addToCart } from '@/app/cart/cartFunctions';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/app/sanity/live';
import { defineQuery } from 'next-sanity';

// Initialize Gemini API with v1beta
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '', {
  apiVersion: 'v1beta'
});

// Query to fetch all products
const ALL_PRODUCTS_QUERY = defineQuery(`*[type == product]{
  name, 
  id,
  price, 
  description,
  type,
  category,
  "imageUrl": image.asset->url
}`);

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findMatchingProduct = (userInput: string) => {
    const inputLower = userInput.toLowerCase();
    
    // First try to match by category/type
    const categoryMatch = products.find(product => 
      (product.type?.toLowerCase() || product.category?.toLowerCase())?.includes(inputLower)
    );

    if (categoryMatch) return categoryMatch;

    // Then try to match by name
    const nameMatch = products.find(product => 
      product.name?.toLowerCase().includes(inputLower)
    );

    if (nameMatch) return nameMatch;

    // Finally try to match by description
    return products.find(product => 
      product.description?.toLowerCase().includes(inputLower)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Get Gemini model with v1beta configuration
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      // Create prompt for the AI
      const prompt = `You are a helpful jewelry store assistant. The user wants to buy something. 
      Based on their request, suggest a product from our catalog and add it to their cart.
      Available categories are: rings, necklaces, pendants, bracelets, and earrings.
      Respond in a friendly way and tell them what you're adding to their cart.
      User request: ${input}`;

      // Get AI response using v1beta methods
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);

      // Find and add matching product to cart
      const matchingProduct = findMatchingProduct(input);
      if (matchingProduct) {
        await addToCart(matchingProduct.id);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I've added "${matchingProduct.name}" to your cart. It costs $${matchingProduct.price.toFixed(2)}.` 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I couldn't find a matching product. Could you please be more specific about what you're looking for?" 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white rounded-full p-4 shadow-lg"
        >
          💬
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Jewelry Store Assistant</h3>
            <Button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What would you like to buy?"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 