"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <nav
      className="px-4 lg:px-8 py-2 md:py-4 w-full
                flex items-center justify-center fixed top-0 md:relative
                bg-[white] border-b-2 z-[1000]"
      style={{ backgroundColor: "#5E5349" }}>
      <Link href="/" className="flex items-center justify-center w-100">
        <h1
          className={"text-5xl font-bold hidden lg:block"}
          style={{ color: "white" }}>
          pusheen.ai
        </h1>
      </Link>
    </nav>
  );
};
