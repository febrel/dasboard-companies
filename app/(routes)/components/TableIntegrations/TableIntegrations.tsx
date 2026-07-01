"use client";

import { CustomerTable } from "../LastCustomers/CustomerTable";
import { columns, Integration } from "./Columns";
import { data } from "./TableIntegrations.data";

export default function TableIntegrations() {
  return (
    <div className="p-5 rounded-lg shadow-sm bg-background">
      <CustomerTable
        columns={columns}
        data={data}
        placeholder="Search integrations..."
        pageSize={3}
      />
    </div>
  );
}
