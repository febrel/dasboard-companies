"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export type Company = {
  id: string;
  name: string;
  profileImage: string;
  cif: string;
  phone: string;
  country: string;
  website: string;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "profileImage",
    header: "ProfileImage",
    cell: ({ row }) => (
      <img
        src={row.original.profileImage}
        alt={row.original.name}
        className="size-10 rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Company name",
  },
  {
    accessorKey: "cif",
    header: "CIF",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "website",
    header: "Webside",
    cell: ({ row }) => (
      <a
        href={row.original.website}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        {row.original.website}
      </a>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/companies/${row.original.id}`}>
        <Button variant="ghost" size="icon">
          <Pencil className="size-4" />
        </Button>
      </Link>
    ),
  },
];
