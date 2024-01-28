import "./globals.css";
import type { Metadata } from "next";
import { Rubik, Comfortaa } from "next/font/google";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { Navbar } from "@/components/navbar";
import { getCredits } from "@/lib/credits";
import NextTopLoader from "nextjs-toploader";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pusheen.ai",
  description:
    "Interactively learn STEM topics with the help of an AI driven pusheen.",
};

const getUserData = async () => {
  return await getCredits();
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className} style={{backgroundColor: "#FCEFE2", color: "#532803"}}>
        <div className="z-[9999]">
          <NextTopLoader color="#3b82f6" height={5} />
        </div>
        <ModalProvider />
        <ToasterProvider />
        <div className="w-full h-full pt-12 md:pt-0 overflow-x-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
