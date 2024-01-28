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
    subsets: ["latin"]
});

export const Navbar = ({ convertCredits }) => {
    const pathname = usePathname();
    // const { isSignedIn } = useAuth(); // useAuth for client-side

    return (
        <nav className="px-4 lg:px-8 py-2 md:py-4 w-full
            flex items-center justify-between fixed top-0 md:relative
            bg-[white] border-b-2 z-[1000]"
        >
            <Link
                href="/"
                className="flex items-center gap-2"
            >
                <Image
                    priority
                    src="/label.svg"
                    alt="InstantSinger Logo"
                    width={40} height={40}
                />
                <h1 className={cn("text-2xl font-bold hidden lg:block", font.className)}>
                    <span className="text-primary">instant</span>singer
                </h1>
            </Link>
            <div className="hidden md:flex justify-between items-center text-xl gap-4 lg:gap-6">
                <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? 
                    "text-primary" : ""
                }>
                    Dashboard
                </Link>
                <Link href="/pricing" className={pathname === "/pricing" ? 
                    "text-primary" : ""
                }>
                    Pricing
                </Link>
                <Link href="/contact" className={pathname === "/contact" ? 
                    "text-primary" : ""
                }>
                    Contact
                </Link>
                <Link href="https://instant-singer.getrewardful.com/signup">
                    Affiliate
                </Link>
            </div>
            {true ?
                <div className="md:hidden">
                    <Link href="/dashboard">
                        <Button variant="default">
                            Dashboard
                        </Button>
                    </Link>
                </div>
                :
                <div className="md:hidden">
                    <Button variant="outline" className="rounded-lg border border-primary">
                        Sign Up
                    </Button>
                </div>
            }
            {true ?
                <div className="hidden md:flex items-center gap-2">
                    <ConvertCreditCounter convertCredits={convertCredits} />
                </div>
                :
                <div className="hidden md:flex items-center gap-x-2">
                    <Button variant="default" className="rounded-lg">
                        Sign Up
                    </Button>
                    <Button variant="outline" className="rounded-lg border border-primary">
                        Login
                    </Button>
                </div>
            }
            <div className="md:hidden">
                <MobileNavbar convertCredits={convertCredits} />
            </div>
        </nav>
    )
}