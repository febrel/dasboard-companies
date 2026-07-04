"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ModalAddEventProps } from "./ModalAddEvent.types";
import FormEvent from "../FormEvent/FormEvent";

export default function ModalAddEvent(props: ModalAddEventProps) {
  const { open, companies, setOnSaveNewEvent, setOpen, selectedDate } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new event</DialogTitle>
        </DialogHeader>
        <FormEvent
          companies={companies}
          setOnSaveNewEvent={setOnSaveNewEvent}
          setOpen={setOpen}
          selectedDate={selectedDate}
        />
      </DialogContent>
    </Dialog>
  );
}
