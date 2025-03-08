"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chat App</h1>
      <div className="relative">
        <button 
          onClick={() => setDropdownOpen(!isDropdownOpen)} 
          className="bg-gray-700 px-4 py-2 rounded-md"
        >
          Profile
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
            <button 
              className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              onClick={() => router.push('/auth/logout')}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
