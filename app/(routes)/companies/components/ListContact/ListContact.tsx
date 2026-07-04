"use client";

import * as React from "react";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LisContactProps } from "./ListContact.types";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function ListContact(props: LisContactProps) {
  const { company, refreshKey } = props;
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/company/${company.id}/contact`)
      .then((res) => setContacts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [company.id, refreshKey]);

  if (loading) {
    return <p className="text-sm text-muted-foreground mt-4">Loading contacts...</p>;
  }

  if (contacts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground mt-4">
        No contacts yet. Add one above.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Link
                    href={`tel:${contact.phone}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="size-4" />
                  </Link>
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="size-4" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
