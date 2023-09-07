import React from "react";

export default function Content({ children }) {
  return (
    <div
      className=" h-screen w-screen md:h-[calc(100vh-56px)] md:w-[calc(100vw-18vw)]
     mt-3 absolute md:left-[16vw] md:ml-3 p-2 overflow-auto no-scrollbar"
    >
      {children}
    </div>
  );
}
