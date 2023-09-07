"use client";
import { Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Content from "@/components/Content";
import { Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

const Agencies = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const [agencies, setAgencies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  // const adminapi = "Agency/paged";

  // const endpoint =
  //   decodedToken.role === "Agency Admin"
  //     ? `Agency/${decodedToken.AgencyID}`
  //     : "Agency/paged";
  // console.log("role", decodedToken.role);
  // console.log("from end", endpoint);

  const [filters, setFilters] = useState({
    state: "",
    name: "",
    complaintId: "",
    agencyId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { state, name, complaintId, agencyId } = filters;
      const response = await axios.get(`${process.env.BASEURL}Agency/paged`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          state,
          name,
          complaintId,
          agencyId,
        },
      });
      setAgencies(response.data.data);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      console.log("from response", response.data.data);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };
  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };
  console.log(agencies);
  useEffect(() => {
    if (role == "Agency Admin") {
      router.push(`/dashboard/agencies/${decodedToken.AgencyID}`);
    }
    fetchAgencies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  return (
    <Content>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semi-bold mb-6">Agencies</h1>
        <Link href="/dashboard/agencies/add">
          <Button color="dark" pill size="xs">
            Add Agency
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap mb-2">
        <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => handleFilterChange(e, "state")}
          className="flex-1  sm:mb-0 sm:mr-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange(e, "name")}
          className="flex-1  sm:mb-0 sm:mr-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Complaint ID"
          value={filters.complaintId}
          onChange={(e) => handleFilterChange(e, "complaintId")}
          className="flex-1  sm:mb-0 sm:mr-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Agency ID"
          value={filters.agencyId}
          onChange={(e) => handleFilterChange(e, "agencyId")}
          className="flex-1    sm:mb-0 border rounded-lg"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Loading spinner */}

        {/* Table */}

        <div className="overflow-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Agency name</Table.HeadCell>
              <Table.HeadCell>State</Table.HeadCell>
              <Table.HeadCell>Website</Table.HeadCell>
              <Table.HeadCell>Rating</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {isLoading ? (
              <Content>
                <div>Loading...</div>
              </Content>
            ) : agencies ? (
              <Table.Body className="divide-y">
                {agencies.length > 1 &&
                  agencies?.map((agency) => (
                    <Table.Row
                      key={agency.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/agencies/${agency.id}`)
                      }
                    >
                      <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                        {agency.name}
                      </Table.Cell>

                      <Table.Cell>{agency.state}</Table.Cell>
                      <Table.Cell>
                        <a href={`http://${agency.websiteUrl}`}>
                          {agency.websiteUrl}
                        </a>
                      </Table.Cell>
                      <Table.Cell>{agency.rating}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            ) : (
              <Table.Body className="divide-y">
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/agencies/${agency.id}`)
                  }
                >
                  <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                    {agencies.name}
                  </Table.Cell>

                  <Table.Cell>{agencies.state}</Table.Cell>
                  <Table.Cell>
                    <a href={`http://${agencies.websiteUrl}`}>
                      {agencies.websiteUrl}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{agencies.rating}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4 items-center">
        {/* ... (pagination buttons) */}
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
          className="bg-lightGreen-500 text-black py-2 px-4 rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-lightGreen-500 text-black py-2 px-4 rounded-lg ml-2"
        >
          Next
        </button>
        <p>
          {currentPage} of {totalPages}
        </p>
      </div>
    </Content>
  );
};

export default Agencies;
