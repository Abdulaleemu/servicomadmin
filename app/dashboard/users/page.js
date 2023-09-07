"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Content from "@/components/Content";
import { Button, Table } from "flowbite-react";

const Users = () => {
  const [agencies, setAgencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    state: "",
    status: "",
    complaintId: "",
    agencyId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { state, status, complaintId, agencyId } = filters;
      const response = await axios.get(
        `${process.env.BASEURL}User/GetAllUsers`,
        {
          params: {
            PageNumber: page,
            PageSize: 10,
            status,
            complaintId,
            agencyId,
            state,
          },
        }
      );
      console.log(response.data);
      setAgencies(response.data);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      console.log(response.data);
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semi-bold ">Users</h1>
        <Link href="/dashboard/users/add">
          <Button color="dark" pill size="xs">
            Add
          </Button>
        </Link>
      </div>
      {/* <h1 className="text-3xl font-bold mb-6">Agencies</h1> */}
      <div className="flex flex-wrap mb-4">
        {/* <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => handleFilterChange(e, "state")}
          className="flex-1 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border rounded-lg"
        /> */}
        <input
          type="text"
          placeholder="RoleName"
          value={filters.roleName}
          onChange={(e) => handleFilterChange(e, "roleName")}
          className="flex-1 sm:mb-0 sm:mr-2 border rounded-lg h-8"
        />
        <input
          type="text"
          placeholder="User ID"
          value={filters.userId}
          onChange={(e) => handleFilterChange(e, "userId")}
          className="flex-1  sm:mb-0 sm:mr-2 border rounded-lg h-8"
        />
        <input
          type="text"
          placeholder="Agency ID"
          value={filters.agencyId}
          onChange={(e) => handleFilterChange(e, "agencyId")}
          className="flex-1  sm:mb-0 border rounded-lg h-8"
        />
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
                <Table.HeadCell>First Name</Table.HeadCell>
                <Table.HeadCell>Last Name</Table.HeadCell>
                <Table.HeadCell>Agency</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {agencies?.map((agency) => (
                  <Table.Row
                    key={agency.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                      {agency.firstName}
                    </Table.Cell>

                    <Table.Cell>{agency.lastName}</Table.Cell>
                    <Table.Cell>
                      <a href={`http://${agency.websiteUrl}`}>
                        {agency.websiteUrl}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{agency.roleName}</Table.Cell>
                    <Table.Cell>
                      <Link href={`/dashboard/users/${agency.id}`}>View</Link>
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

export default Users;
