"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import FormCreateCustomers from "../FormCreateCustomers/FormCreateCustomers";

export default function HeaderCompanies() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl">List of companies</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger className={buttonVariants({ variant: "default" })}>
          <CirclePlus className="mr-2 h-4 w-4" /> Create Companies
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Company</DialogTitle>
            <DialogDescription>
              Create and configure your customer
            </DialogDescription>
          </DialogHeader>
          <FormCreateCustomers setOpenModalCreate={setOpenModalCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
