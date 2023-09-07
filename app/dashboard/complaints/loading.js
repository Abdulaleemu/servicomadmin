"use client";
import React from "react";
import { Spinner } from "flowbite-react";
import Content from "@/components/Content";

export default function loading() {
  return (
    <Content>
      <div className="absolute inset-0 bg-black opacity-25 z-10">
        Loading...
      </div>{" "}
    </Content>
  );
}
