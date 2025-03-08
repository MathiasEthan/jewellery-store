"use client";

import Image from "next/image";
import Logo from "@/public/images/whitename&logo.png";
function Header() {
  return (
    <>
      <nav className="w-full p-4 mx-0 py-0}" >
        <div className="flex justify-between items-center w-full">
          <p>Sample Text</p>
          <Image src={Logo} alt="Opulence Logo" height={150} width={150} />
          <div className="flex space-x-4">
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
