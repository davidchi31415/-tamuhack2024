"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { MobileNavbar } from "./mobile-navbar";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const Navbar = () => {
  return (
    <nav
      className="px-4 lg:px-8 py-2 md:py-4 w-full
                flex items-center justify-center fixed top-0 md:relative
                bg-[white] border-b-2 z-[1000]" style={{backgroundColor: "#5E5349"}}>
      <Link href="/" className="flex items-center justify-center w-100">
        <h1
          className={cn("text-5xl font-bold hidden lg:block", font.className)} style={{color:"white"}}>
          pusheen.ai
        </h1>
      </Link>
    </nav>
  );
};
