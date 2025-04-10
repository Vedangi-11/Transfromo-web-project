"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#53646d] text-white shadow-md fixed w-full top-0 px-4 py-2 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-400 from-sky-400">
            Transformo
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden block text-white focus:outline-none"
        >
          ☰
        </button>

        {/* Navbar Links */}
        <div className={`md:flex items-center space-x-8 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="font-medium flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <li><Link href="/" className="block py-2 px-3 hover:text-[#81ffe9]">Home</Link></li>
            <li><Link href="/pages/about" className="block py-2 px-3 hover:text-[#81ffe9]">About</Link></li>
            <li><Link href="/pages/services" className="block py-2 px-3 hover:text-[#81ffe9]">Services</Link></li>
            <li><Link href="/pages/pricing" className="block py-2 px-3 hover:text-[#81ffe9]">Pricing</Link></li>
            <li><Link href="/pages/contact" className="block py-2 px-3 hover:text-[#81ffe9]">Contact</Link></li>
          </ul>

          {/* Register & Login Buttons */}
          <div className="flex space-x-3">
            <Link href="/pages/regi">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-[#53646d] rounded-md group-hover:bg-transparent">
                  Register
                </span>
              </button>
            </Link>
            <Link href="/pages/logi">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-[#53646d] rounded-md group-hover:bg-transparent">
                  Login
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
