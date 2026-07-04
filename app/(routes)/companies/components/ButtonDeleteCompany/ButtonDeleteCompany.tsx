"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";

export default function ButtonDeleteCompany({
  companyId,
}: {
  companyId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/company/${companyId}`);
      toast.success("Company deleted");
      router.push("/companies");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleDelete}
      className="bg-red-300 text-red-950 font-semibold py-2 transition duration-200 hover:bg-red-400"
    >
      <Trash2 className="mr-2 size-4" />
      Remove company
    </Button>
  );
}
