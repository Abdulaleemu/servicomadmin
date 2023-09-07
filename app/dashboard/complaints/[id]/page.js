"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "@/components/Content";
import { Button } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ComplaintDetails = ({ params }) => {
  const [agency, setAgency] = useState("");
  const id = params.id;
  const baseurl = process.env.BASEURL;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };

  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitResolve = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`${process.env.BASEURL}Complaint/resolve`, {
        message,
        complaintId,
      })
      .then((response) => {
        console.log("Response:", response.data);
        if ((response.data.isSuccessful = true)) {
          toast.success(response.data.message);
          setIsLoading(false);
        }
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to resolve complaint. Please try again.");
      });
  };

  const fetchAgency = async () => {
    try {
      const response = await axios.get(`${baseurl}Complaint/${params.id}`);
      setAgency(response.data.data);
      console.log(response.data.data);
      setComplaintId(response.data.data.id);
    } catch (error) {
      console.error("Failed to fetch complaints:", error.message);
    }
  };

  useEffect(() => {
    fetchAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (isLoading) {
    return <Content>Loading...</Content>;
  }
  if (!agency) {
    return <Content>Loading...</Content>;
  }

  return (
    <Content>
      <div className="flex flex-col md:flex-row iems-center justify-between">
        {/* complain */}
        <div className="font-semibold flex-1">
          <div className="text-3xl font-bold mb-4">{agency.agencyName}</div>
          <div className="flex mb-2">
            <div className="w-1/3">Agency Name:</div>
            <div className="w-2/3">{agency.agencyid}</div>
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
            <div className="w-1/3">comment:</div>
            {!agency.comment && <div className="w-2/3">No Commens yet</div>}
            {agency.comment && <div className="w-2/3">{agency.comment}</div>}
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Complaint:</div>
            <div className="w-2/3">{agency.body}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Status:</div>
            <div className="w-2/3">{agency.status}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Date:</div>
            <div className="w-2/3">{agency.timeStamp}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Last Updated:</div>
            {agency.dateUpdated && (
              <div className="w-2/3">{agency.dateUpdated}</div>
            )}
            {!agency.dateUpdated && <div className="w-2/3">No update yet</div>}
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Rating:</div>
            <div className="w-2/3">{agency.rating}</div>
          </div>
          <div className="mt-4">
            {agency.logoUrl && (
              <img
                src={agency.logoUrl}
                alt={agency.name}
                className="w-32 h-32 object-contain rounded-lg"
              />
            )}
          </div>
        </div>

        {/* complainer */}
        <div className=" flex flex-col justify-evenly">
          <div>
            <h1 className="text-3xl font-bold mb-4">{agency.name}</h1>
            <h1 className="font-semibold">
              Phone Number: {agency.phoneNumber}
            </h1>
            <h1 className="font-semibold">Email: {agency.email}</h1>
          </div>
          <div className="flex flex-col gap-2 ">
            <Button onClick={openModal}>Resolve</Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="modal-container">
            <div className="modal-content bg-white p-6 rounded-lg relative z-10">
              <h2 className="text-xl font-bold mb-4">Resolve Complaint</h2>
              <form onSubmit={handleSubmitResolve}>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message:
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <input type="hidden" name="complaintId" value={agency.id} />
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Resolve
                  </button>
                </div>
              </form>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Content>
  );
};

export default ComplaintDetails;
