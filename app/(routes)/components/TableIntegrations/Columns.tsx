"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Integration = {
  logo: string;
  logoUrl: string;
  applications: string;
  rate: number;
  profit: string;
};

export const columns: ColumnDef<Integration>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.logoUrl}
          alt={row.original.logo}
          className="size-8 rounded-md object-contain"
        />
        <span className="font-medium">{row.original.logo}</span>
      </div>
    ),
  },
  {
    accessorKey: "applications",
    header: "Applications",
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const rate = row.original.rate;
      return (
        <div className="flex items-center gap-3">
          <div className="h-2 w-full max-w-24 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="text-sm font-medium">{rate}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => (
      <span className="font-medium text-green-600 dark:text-green-400">
        {row.original.profit}
      </span>
    ),
  },
];
