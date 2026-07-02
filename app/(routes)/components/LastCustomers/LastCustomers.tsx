"use client";

import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { Building } from "lucide-react";
import { CustomerTable } from "../LastCustomers/CustomerTable";
import { columns } from "./Columns";

import { data } from "./LastCustomers.data";

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
