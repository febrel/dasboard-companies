"use client";

import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import FormContact from "../FormContact/FormContact";

export default function NewContact({
  companyId,
  onContactAdded,
}: {
  companyId: string;
  onContactAdded?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        <CirclePlus className="mr-2 h-4 w-4" /> Add new contact
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>
            Create your contacts to manage them later.
          </DialogDescription>
        </DialogHeader>
        <FormContact companyId={companyId} setOpen={setOpen} onSuccess={onContactAdded} />
      </DialogContent>
    </Dialog>
  );
}
