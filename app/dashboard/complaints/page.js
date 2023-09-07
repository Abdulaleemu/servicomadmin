"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Content from "@/components/Content";
import { Button, Rating, Table, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

const Complaints = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [agencies, setAgencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const [filters, setFilters] = useState({
    id: "",
    status: "",
    agencyName: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const endpoint =
    decodedToken.role === "Agency Admin"
      ? `Complaint/${decodedToken.AgencyID}`
      : "Complaint/paged";
  console.log("role", decodedToken.role);
  console.log("from end", endpoint);
  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { status, agencyName, name, id } = filters;
      const response = await axios.get(`${process.env.BASEURL}${endpoint}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          status,
          name,
          agencyName,
        },
      });
      setAgencies(response.data.data);
      setTotalPages(response.data.data.totalPages);
      setIsLoading(false);
      console.log("from single", response);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };

  return (
    <Content>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semi-bold mb-6">Complaints</h1>

        <Button
          color="dark"
          pill
          size="xs"
          onClick={() => router.push("/dashboard/agencies/add")}
        >
          Add Agency
        </Button>
      </div>
      {/* <h1 className="text-3xl font-bold mb-6">Agencies</h1> */}
      <div className="flex flex-wrap mb-4 space-x-2">
        {/* <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => handleFilterChange(e, "state")}
          className="flex-1 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border rounded-lg"
        /> */}
        <TextInput
          id="emai3"
          placeholder="complainers name"
          type="text"
          value={filters.name}
          onChange={(e) => handleFilterChange(e, "name")}
        />
        {/* <input
          type="text"
          placeholder="Name"
          value={filters.status}
          onChange={(e) => handleFilterChange(e, "status")}
          className="flex-1 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border rounded-lg"
        /> */}
        <TextInput
          id="email"
          type="text"
          placeholder="complaint ID"
          value={filters.id}
          onChange={(e) => handleFilterChange(e, "id")}
        />
        {/* <input
          type="text"
          placeholder="Complaint ID"
          value={filters.complaintId}
          onChange={(e) => handleFilterChange(e, "complaintId")}
          className="flex-1 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border rounded-lg"
        /> */}

        <TextInput
          type="text"
          placeholder="Agency Name"
          value={filters.agencyName}
          onChange={(e) => handleFilterChange(e, "agencyName")}
        />
        {/* <input
          type="text"
          placeholder="Agency ID"
          value={filters.agencyId}
          onChange={(e) => handleFilterChange(e, "agencyId")}
          className="flex-1 px-4 py-2 mb-2 sm:mb-0 border rounded-lg"
        /> */}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Loading spinner */}
        {isLoading && (
          <div className="text-center my-4">
            <div className="loader"></div>
          </div>
        )}
        {/* Table */}
        {!isLoading && (
          <div className="overflow-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Agency</Table.HeadCell>
                <Table.HeadCell>complainer's name</Table.HeadCell>
                <Table.HeadCell>State</Table.HeadCell>
                <Table.HeadCell>Website</Table.HeadCell>
                <Table.HeadCell>Rating</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {agencies?.map((agency) => (
                  <Table.Row
                    key={agency.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/complaints/${agency.id}`)
                    }
                  >
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      {agency.agencyName}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      {agency.name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      {agency.phoneNumber}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      {agency.body.slice(0, 50)}...
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                          {agency.rating}
                        </p>
                      </Rating>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
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
      </div>
    </Content>
  );
};

export default Complaints;
