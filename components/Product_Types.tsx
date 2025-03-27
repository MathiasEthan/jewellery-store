'use client'
import Link from 'next/link'

export default function ProductTypes() {
  return (
    <>
     <div className="Product Types">
      <div className="mt-4 font-philosopher text-white flex flex-row justify-between text-center pt-10 p-15 text-2xl">
          <div className="rings">
            <Link href="/products/categories/rings">
              <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
                Rings
              </button>
            </Link>
          </div>
          <div className="necklaces">
            <Link href="/products/categories/necklaces">
              <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
                Necklaces
              </button>
            </Link>
          </div>
          <div className="pendants">
            <Link href="/products/categories/pendants">
              <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
                Pendants
              </button>
            </Link>
          </div>      
      </div>
      <div className="font-philosopher text-white flex flex-row justify-between text-center pt-0 pl-72.25 pr-72.25 text-2xl">
          <div className="bracelets">
            <Link href="/products/categories/bracelets">
              <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
                Bracelets
              </button>
            </Link>
          </div>
          <div className="earrings">
            <Link href="/products/categories/earrings">
              <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
                Earrings
              </button>
            </Link>
          </div>  
      </div>
     </div>
    </>
  );
}

