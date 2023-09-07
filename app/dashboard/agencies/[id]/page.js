"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "@/components/Content";
import { Button } from "flowbite-react";
import Image from "next/image";

const AgencyProfile = ({ params }) => {
  const [agency, setAgency] = useState(null);

  const fetchAgency = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASEURL}Agency/${params.id}`
      );
      setAgency(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };

  useEffect(() => {
    fetchAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (!agency) {
    return (
      <Content>
        <div>Loading...</div>
      </Content>
    );
  }

  return (
    <Content>
      <div className="flex items-center justify-between border-b border-1 border-gray-600 p-2 mb-2">
        <div className="text-3xl font-bold mb-4">{agency.name}</div>
        <div className="flex gap-2">
          <Button color="dark" pill size="xs">
            {" "}
            Update
          </Button>
          <Button color="dark" pill size="xs">
            {" "}
            Assign Admin
          </Button>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Agency ID:</div>
        <div className="w-2/3">{agency.id}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Address:</div>
        <div className="w-2/3">{agency.address}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">State:</div>
        <div className="w-2/3">{agency.state}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Phone Number:</div>
        <div className="w-2/3">{agency.phoneNumber}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">About:</div>
        <div className="w-2/3">{agency.about}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Website:</div>
        <div className="w-2/3">{agency.websiteUrl}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Rating:</div>
        <div className="w-2/3">{agency.rating}</div>
      </div>
      <div className="mt-4">
        {agency.logoUrl && (
          <Image
            src={agency.logoUrl}
            alt={agency.name}
            height={100}
            width={100}
            className="w-32 h-32 object-contain rounded-lg"
          />
        )}
      </div>
    </Content>
  );
};

export default AgencyProfile;
