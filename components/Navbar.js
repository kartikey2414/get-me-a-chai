"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  return (
    <nav className=" bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row ">
      <Link
        href={"/"}
        className="logo font-bold text-lg flex justify-center items-center"
      >
        <img className="invertimg" src="/tea.gif" alt="" width={44} />
        <span className="text-xl md:my-0 my-3">GetMeaChai!</span>
      </Link>
      <div className="relative flex md:flex-row flex-col gap-4 ">
        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownHoverButton"
              onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false);
                }, 100);
              }}
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className=" mx-4 inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
              type="button"
            >
              {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="dropdownHover"
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute bg-gray-800 border left-[70px] border-gray-700 rounded-lg shadow-lg w-44`}
            >
              <ul
                className="p-2 text-sm text-gray-200 font-medium"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      signOut();
                    }}
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {session && (
          <button
            onClick={() => {
              signOut();
            }}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
