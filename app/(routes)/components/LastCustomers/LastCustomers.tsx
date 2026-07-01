"use client";

import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { Building } from "lucide-react";
import { CustomerTable } from "../LastCustomers/CustomerTable";
import { columns, Payment } from "./Columns";

const data: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d42",
    amount: 250,
    status: "success",
    email: "alice@example.com",
  },
  { id: "123abc45", amount: 75, status: "processing", email: "bob@test.com" },
  { id: "789def01", amount: 500, status: "failed", email: "carol@domain.com" },
  { id: "456ghi78", amount: 320, status: "pending", email: "dave@sample.org" },
  { id: "901jkl23", amount: 180, status: "success", email: "eve@company.co" },
];

export default function LastCustomers() {
  return (
    <div className="p-5 rounded-lg shadow-sm bg-background">
      <div className="flex items-center gap-x-2">
        <CustomIcon icon={Building} />
        <p className="text-xl">Last customers</p>
      </div>

      <div>
        <CustomerTable
          columns={columns}
          data={data}
          placeholder="Search by email, status..."
          pageSize={3}
        />
      </div>
    </div>
  );
}
