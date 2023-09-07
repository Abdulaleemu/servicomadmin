"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Content from "@/components/Content";

const CreateAgency = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    about: "",
    phoneNumber: "",
    websiteUrl: "",
    logo: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.name);
    formDataToSend.append("Address", formData.address);
    formDataToSend.append("State", formData.state);
    formDataToSend.append("About", formData.about);
    formDataToSend.append("PhoneNumber", formData.phoneNumber);
    formDataToSend.append("WebsiteUrl", formData.websiteUrl);
    formDataToSend.append("LogoUrl", formData.logo);

    try {
      await axios.post(`${process.env.BASEURL}Agency`, formDataToSend, {
        headers: {
          accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);

      toast.success("Agency created successfully!", {
        position: "top-right",
        autoClose: 1000, // Show the toast for 3 seconds
        hideProgressBar: true,
        onClose: () => router.push("/dashboard/agencies"),
      });

      // Add any success handling logic or redirect to another page after successful creation.
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to create agency:", error.message);
      toast.error("Failed to create agency. Please try again later.", {
        position: "top-right",
        autoClose: 3000, // Show the toast for 3 seconds
        hideProgressBar: true,
      });
    }
  };

  return (
    <Content>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6">Create Agency</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="name">
            Name:
          </label> */}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Name"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="address">
            Address:
          </label> */}
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Address"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="state">
            State:
          </label> */}
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="State"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="about">
            About:
          </label> */}
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="About"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="phoneNumber">
            Phone Number:
          </label> */}
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Phonr Number"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="websiteUrl">
            Website URL:
          </label> */}
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Official Website"
            />
          </div>
          <div className="mb-2">
            {/* <label className="block font-bold mb-1" htmlFor="logo">
            Logo:
          </label> */}
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2"
              required
              placeholder="logo"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Agency"}
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="absolute inset-0 bg-black opacity-25 z-10"></div>
        )}
        <ToastContainer />
      </div>
    </Content>
  );
};

export default CreateAgency;
