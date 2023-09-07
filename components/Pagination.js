"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function DefaultPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = setCurrentPage();

  return (
    <Pagination
      currentPage={1}
      onPageChange={(page) => {
        setCurrentPage(page);
      }}
      totalPages={100}
    />
  );
}
