"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormCreateCustomerProps } from "./FormCreateCustomers.types";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

// 1. Añadir .min() a name y profileImage para que NO acepten strings vacíos
const formSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string().min(1, "Profile image is required"),
});

export default function FormCreateCustomers(props: FormCreateCustomerProps) {
  const { setOpenModalCreate } = props;
  const [photoUploades, setPhotoUploades] = useState(false);
  const router = useRouter();

  // 2. Añadir mode: "onChange" para que isValid se calcule en tiempo real
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      country: "",
      website: "",
      phone: "",
      cif: "",
      profileImage: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/company", data);
      toast.success("Company created");
      router.refresh();
      setOpenModalCreate?.(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      id="create-customer-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 pt-4"
    >
      <div className="grid grid-cols-2 gap-3">
        {/* CAMPO: Company name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="customer-name">Company Name</FieldLabel>
              <Input
                {...field}
                id="customer-name"
                aria-invalid={fieldState.invalid}
                placeholder="ej: nestle..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CAMPO: Country */}
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="customer-country">Country</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger id="customer-country">
                  <SelectValue placeholder="Select the country" />
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

        {/* CAMPO: Website */}
        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="webside-name">Website</FieldLabel>
              <Input
                {...field}
                id="webside-name"
                aria-invalid={fieldState.invalid}
                placeholder="ej: www.rafaget.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CAMPO: Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone-name">Phone</FieldLabel>
              <Input
                {...field}
                id="phone-name"
                aria-invalid={fieldState.invalid}
                placeholder="ej: +593 04948573"
                autoComplete="off"
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CAMPO: Cif */}
        <Controller
          name="cif"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="cif-name">CIF</FieldLabel>
              <Input
                {...field}
                id="cif-name"
                aria-invalid={fieldState.invalid}
                placeholder="ej: B-1234586"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CAMPO: Image */}
        <Controller
          name="profileImage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Profile Image</FieldLabel>

              {photoUploades ? (
                <p className="text-sm font-medium text-green-600">
                  Image uploaded!
                </p>
              ) : (
                <UploadButton
                  className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                  endpoint="profileImage"
                  onClientUploadComplete={(res) => {
                    // Usar ufsUrl y forzar la validación con { shouldValidate: true }
                    form.setValue("profileImage", res?.[0].ufsUrl, {
                      shouldValidate: true,
                    });
                    toast("Photo uploaded!");
                    setPhotoUploades(true);
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

      {/* BOTÓN DE ACCIÓN */}
      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
}
