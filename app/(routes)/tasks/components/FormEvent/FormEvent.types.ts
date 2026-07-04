import { Company } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEventProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  companies: Company[];
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
};
