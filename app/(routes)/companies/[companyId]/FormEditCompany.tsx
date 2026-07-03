"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string().min(1, "Profile image is required"),
});

type CompanyData = {
  id: string;
  name: string;
  country: string;
  website: string;
  phone: string;
  cif: string;
  profileImage: string;
};

export default function FormEditCompany({
  company,
}: {
  company: CompanyData;
}) {
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: company.name,
      country: company.country,
      website: company.website,
      phone: company.phone,
      cif: company.cif,
      profileImage: company.profileImage,
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/company/${company.id}`, data);
      toast.success("Company updated");
      router.refresh();
      router.push("/companies");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 max-w-2xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={company.profileImage}
          alt={company.name}
          className="size-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-medium">{company.name}</p>
          <p className="text-sm text-muted-foreground">{company.cif}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Company Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spain">España</SelectItem>
                  <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="grecia">Grecia</SelectItem>
                  <SelectItem value="italia">Italia</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                {...field}
                id="website"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                {...field}
                id="phone"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="cif"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="cif">CIF</FieldLabel>
              <Input
                {...field}
                id="cif"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="profileImage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Profile Image</FieldLabel>
              {photoUploaded ? (
                <p className="text-sm font-medium text-green-600">
                  Image uploaded!
                </p>
              ) : (
                <UploadButton
                  className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                  endpoint="profileImage"
                  onClientUploadComplete={(res) => {
                    form.setValue("profileImage", res?.[0].ufsUrl, {
                      shouldValidate: true,
                    });
                    toast("Photo uploaded!");
                    setPhotoUploaded(true);
                  }}
                  onUploadError={(error: Error) => {
                    toast("Error uploading photo");
                  }}
                />
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={!isValid}>
          Save changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/companies")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
