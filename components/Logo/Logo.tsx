"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        style={{ height: "40px", width: "40px" }}
      />
      <h1 className="font-bold text-xl p-2"> Manager</h1>
    </div>
  );
}
