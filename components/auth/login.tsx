"use client";
import Link from "next/link";
import { useState } from "react";
import InputComponent from "../input/loginInput";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Swal from "sweetalert2";
import { validateEmail } from "@/helpers/validation";
import { loginUser } from "@/dbActions/auth";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || email.trim() === "" || !validateEmail(email)) {
      toast.error("Enter a valid Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!password || password.trim() === "") {
      toast.error("password is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await loginUser(email, password);
      if (response.success) {
        router.push("/");
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: "Invalid credentials",
          timer: 2000,
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Invalid Credentials",
        text: "Invalid credentials",
        timer: 2000,
        icon: "error",
      });
    }
  };
  return (
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        aria-label="toast"
        transition={Bounce}
      />
      <div className="px-5 py-7">
        <InputComponent
          title="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <InputComponent
          title="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        >
          <span className="inline-block mr-2">Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <Link
              href="/signup"
              prefetch
              className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block align-text-top"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              <span className="inline-block ml-1">Signup</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
