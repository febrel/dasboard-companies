"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-r cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image src="/logo.svg" alt="logo" width={30} height={30} priority />
      <h1 className="font-bold text-xl p-2"> Manager</h1>
    </div>
  );
}
