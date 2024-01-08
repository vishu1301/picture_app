"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaInstagram } from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();

  const isActive = (path) =>
    path === pathname
      ? "text-purple-500 font-bold tracking-wider"
      : "text-blue-500";

  return (
    <div>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left bg-white shadow-lg sm:justify-between py-4 px-6 bg-transparent  sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <Link
            href="/Home"
            className="text-3xl no-underline text-grey-darkest text-purple-600 duration-300 ease-in "
          >
            <FaInstagram />
          </Link>
        </div>
        <div>
          <Link
            href="/Home"
            className={`text-lg no-underline ml-4 font-semibold hover:text-purple-600 duration-300 ease-in  ${isActive(
              "/Home"
            )}`}
          >
            Home
          </Link>
          <Link
            href="/Post"
            className={`text-lg no-underline ml-4 font-semibold hover:text-purple-600 duration-300 ease-in  ${isActive(
              "/Post"
            )}`}
          >
            Post
          </Link>

          <Link
            href="/profile"
            className={`text-lg no-underline ml-4 font-semibold hover:text-purple-600 duration-300 ease-in  ${isActive(
              "/profile"
            )}`}
          >
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
