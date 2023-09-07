import React from "react";
import { FlagIcon } from "@heroicons/react/24/solid";

export default function Stats({ resolved, unresolved, reports }) {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row p-2 w-full bg-white md:justify-evenly">
      {/* left */}
      <div className="flex flex-col w-1/4 ">
        <div className="flex flex-row  items-center space-x-1 justify-center ">
          <FlagIcon className="h-6 w-6 sm:flex " />
          <h3>Total Reports</h3>
        </div>

        <h3 className="text-center font-semibold text-lg">{reports}</h3>
      </div>
      {/* middle */}
      <div className="flex flex-col md:border-l-2 md:border-r-2 border-x-gray-500 w-1/4 ">
        <div className="flex flex-row items-center space-x-1 justify-center ">
          <FlagIcon className="h-6 w-6 text-green-600 " />
          <h3>Resolved Reports</h3>
        </div>
        <h3 className="text-center font-semibold text-lg">{resolved}</h3>
      </div>
      {/* right */}
      <div className="flex flex-col w-1/4 ">
        <div className="flex flex-row items-center space-x-1 justify-center ">
          <FlagIcon className="h-6 w-6 text-red-600 " />
          <h3>Unresolved Reports</h3>
        </div>
        <h3 className="text-center font-semibold text-lg">{unresolved}</h3>
      </div>
    </div>
  );
}
