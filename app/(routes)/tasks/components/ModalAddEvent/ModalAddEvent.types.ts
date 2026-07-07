import type { Company } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export type ModalAddEventProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
  companies: Company[];
  selectedDate: Date;
};
