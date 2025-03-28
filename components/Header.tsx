"use client";

import Image from "next/image";
import Logo from "@/public/images/whitename&logo.png";
import User from "@/public/images/whiteuser.png";
import ShoppingBag from "@/public/images/shopping-bag-white.png";
import Wishlist from "@/public/images/whiteheart.png"
import Hamburg from "@/public/images/whitehamburger.png"
import Link from "next/link";

function Header() {
  return (
    <>
        <nav className="w-full p-8 pr-15 py-4 bg-gradient-to-r from-[#030D24] via-[#0A2A5A] to-[#133E7C] text-white shadow-lg">
        <div className="flex justify-between items-center w-full ">
            <Image src={Hamburg} alt="Menu" height={35} width={35} />
            <Link href="/">
            <Image src={Logo} alt="Opulence Logo" height={300} width={300} />
            </Link>
            <div className="flex space-x-4">
            <Image src={Wishlist} alt="Wishlist" height={20} width={20} />
            <Image src={User} alt="Account" height={20} width={20} />
            <Link href="/cart">
              <Image src={ShoppingBag} alt="Cart" height={20} width={20} />
            </Link>
            </div>

        </div>
      </nav>
    </>
  );
}

export default Header;
