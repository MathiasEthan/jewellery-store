'use client'


export default function ProductTypes() {

  return (
    <>
     <div className="Product Types">
      <div className="mt-4 font-philosopher text-white flex flex-row justify-between text-center pt-10 p-15 text-2xl">
          <div className="rings">
            <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
            Rings
            </button>
          </div>
          <div className="necklaces">
            <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
            Necklaces
            </button>
          </div>
          <div className="pendants">
            <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
            Pendants
            </button>
          </div>      
      </div>
      <div className="font-philosopher text-white flex flex-row justify-between text-center pt-0 pl-72.25 pr-72.25 text-2xl">
          <div className="bracelets">
            <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
            Bracelets
            </button>
          </div>
          <div className="earrings">
            <button className="bg-[#030D24] w-100 h-60 rounded-4xl hover:opacity-90">
            Earrings
            </button>
          </div>  
      </div>
     </div>
    </>
  );
}

