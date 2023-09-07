"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "@/components/Content";
import Link from "next/link";
import { Button } from "flowbite-react";
import Image from "next/image";

const UserProfile = ({ params }) => {
  const [agency, setAgency] = useState(null);

  const fetchAgency = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASEURL}User/GetUserById/${params.id}`
      );
      setAgency(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };

  useEffect(() => {
    fetchAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (!agency) {
    return <Content>Loading...</Content>;
  }

  return (
    <Content>
      <div className="flex items-center justify-between border-b border-1">
        <h1 className="text-3xl font-semi-bold mb-6">User Profile</h1>
        <Link href="/dashboard/users/update">
          <Button color="dark" pill size="xs">
            Update User
          </Button>
        </Link>
      </div>
      <div className="text-3xl font-bold mb-4">{agency.name}</div>
      <div className="flex mb-2">
        <div className="w-1/3">User ID:</div>
        <div className="w-2/3">{agency.id}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">First Name:</div>
        <div className="w-2/3">{agency.firstName}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Last Name:</div>
        <div className="w-2/3">{agency.lastName}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Phone Number:</div>
        <div className="w-2/3">{agency.phoneNumber}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Email:</div>
        <div className="w-2/3">{agency.email}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Role:</div>
        <div className="w-2/3">{agency.roleName}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Agency:</div>
        <div className="w-2/3">{agency.agency}</div>
      </div>
      <div className="mt-4">
        {agency.logoUrl && (
          <Image
            src={agency.logoUrl}
            alt={agency.name}
            className="w-32 h-32 object-contain rounded-lg"
          />
        )}
      </div>
    </Content>
  );
};

export default UserProfile;
