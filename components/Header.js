"use client";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Header() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.FullName);
      console.log(decodedToken);
    } else {
      router.push("/");
    }
  }, []);
  return (
    <header className=" w-full h-12 bg-white p-2 grid items-center">
      <button onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </button>
      <div className="text-sm justify-self-end font-semibold">
        Welcome, {userName}
      </div>
    </header>
  );
}
