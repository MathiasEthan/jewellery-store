'use client';

export default function CustomizeCard() {
  return (
    <>
      <div className="pt-8"></div>
      <div className="CustomizeCard pt-10 py-7 p-15 bg-[#e1e6ed]">
        <h1 className="font-philosopher text-5xl">
          Custom Design Studio
        </h1>

        <p className="font-mulish text-xl pt-2">
          Bring your vision to life with bespoke designs tailored to your style, story, and sparkle.
        </p>
        <div className="flex flex-col items-center text-center pt-6">
          <button className="mt-4 text-white hover:opacity-90 shine-effect">
          
          <p className="font-mulish text-xl w-90 bg-[#B76E79] text-white py-4 px-6 rounded-lg">
          Get Started
          </p>
          </button>
        </div>
      </div>
    </>
  );
}
