"use client";

import { Table } from "flowbite-react";
import Link from "next/link";

export default function AgenciesTable({ agencies, data }) {
  return (
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
        <Table.Body className="divide-y">
          {agencies.map((agency) => (
            <Table.Row
              key={agency.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-small text-gray-900 dark:text-white">
                {agency.name}
              </Table.Cell>

              <Table.Cell>{agency.state}</Table.Cell>
              <Table.Cell>
                <a href={`http://${agency.websiteUrl}`}>{agency.websiteUrl}</a>
              </Table.Cell>
              <Table.Cell>{agency.rating}</Table.Cell>
              <Table.Cell>
                <Link href="/dashboard">
                  <p>View</p>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
