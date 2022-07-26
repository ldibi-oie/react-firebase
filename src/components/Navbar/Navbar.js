import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { RiSlideshow3Fill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import "./navbar.css";
const auth = getAuth();

export default function Navbar() {
  console.log(auth);

  const [email, setEmail] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setEmail(currentUser);
  });

  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        console.log("Sign-out successful.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Link to="/">
                <img
                  class="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                </Link>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  {auth.currentUser ? (
                    <>
                      <Link
                        to="/"
                        class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Mysliders
                      </Link>

                      <acronym title="Mon compte">
                        <Link
                          to="/profile"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          My account{" "}
                        </Link>
                      </acronym>
                      <a
                        href="#"
                        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={signout}
                      >
                        {" "}
                        Logout{" "}
                      </a>

                      <Link
                        to="/manage/collaborators"
                        class="text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Manage Collaborators
                      </Link>

                      <Link
                        to="/messenger"
                        class="text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Chat Messenger
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div class="-mr-2 flex md:hidden">
              <button
                type="button"
                class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>

                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="md:hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
