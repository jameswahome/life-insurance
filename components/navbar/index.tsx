"use client";
import { checkAuth, logOut } from "@/dbActions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await checkAuth();
        if (response.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {}
    };

    fetchLoggedInUser();
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await logOut();
      router.push("/login");
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something Went Wrong!",
        timer: 2000,
        icon: "error",
      });
    }
  };
  return (
    <nav
      id="header"
      className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-gray-400 "
    >
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <div className=" flex items-center w-1/2 md:w-3/4 " id="menu">
          <nav>
            <ul className="flex items-center justify-between text-base text-black pt-4 md:pt-0">
              <li>
                <Link
                  className="inline-block no-underline hover:text-gray-700 font-medium text-lg py-2 px-4 lg:-ml-2"
                  href="/"
                >
                  Life Insurance
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div className="auth flex items-center w-full md:w-full">
            {isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
              >
                Log Out
              </button>
            ) : (
              <>
                {" "}
                <Link
                  href="/login"
                  className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
