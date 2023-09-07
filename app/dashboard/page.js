"use client";
import Content from "@/components/Content";
import Stats from "@/components/Stats";
import React, { useEffect } from "react";
import { useToken } from "@/components/UserToken";
import { useState } from "react";

async function fetchDataWithToken(token) {
  // URL of the API endpoint
  const apiUrl = `${process.env.BASEURL}Dashboard`;

  // Headers object with Authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
    // You can add other headers as needed
  };

  // Fetch request
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });
    // Check for success (status code in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export default function Dashboard() {
  const [data, setData] = useState("");
  const token = localStorage.getItem("token");
  // const { token } = useToken();
  useEffect(() => {
    // console.log("from dashboard", token);
    fetchDataWithToken(token)
      .then((data) => {
        console.log("Data:", data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Content>
      <Stats
        resolved={data.resolvedReports}
        unresolved={data.unResolvedReports}
        reports={data.totalReports}
      />

      <div className="w-full h-4/6 mt-4 flex p-2 gap-2">
        {/* charts */}
        <div className="w-4/6  bg-white"></div>

        {/* right stats */}

        <div className="w-2/6 flex flex-col justify-between bg-white p-2">
          <div className="w-full h-1/2">
            <h1 className="text-center">Top Rated Agencies</h1>
            {data &&
              data.topRatedAgencies.map((agency) => (
                <div className=" flex justify-between" key={agency.id}>
                  <h1>{agency.agencyName}</h1>
                  <h1>{agency.rating}</h1>
                </div>
              ))}
          </div>
          <div className="w-full h-1/2">
            <h1 className="text-center">Least Rated</h1>
            {data &&
              data.bottomRatedAgencies.map((agency) => (
                <div className=" flex justify-between" key={agency.id}>
                  <h1>{agency.agencyName}</h1>
                  <h1>{agency.rating}</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Content>
  );
}
