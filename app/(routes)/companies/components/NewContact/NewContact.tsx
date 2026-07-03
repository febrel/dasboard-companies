import { useState } from "react";

import { Button } from "@/components/ui/button";
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

export default function NewContact() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        <CirclePlus className="mr-2 h-4 w-4" /> Add new contact
      </DialogTrigger>
      <DialogContent className="sm: max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>
            Create your contacts to manage them later.
          </DialogDescription>
        </DialogHeader>
        <p>Form contact</p>
      </DialogContent>
    </Dialog>
  );
}
