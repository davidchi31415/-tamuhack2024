"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleEnterClick = async (prompt) => {
    router.push(`/prompt`);
  };

  return (
    <div style={{ backgroundColor: "#FCEFE2" }}>
      <Navbar />
      <div
        className="text-center my-20"
        style={{ display: "flex", justifyContent: "center" }}>
        <img
          // src="/Pusheen.png"
          src="/pusheen-reading-icegif.gif"
          alt="Pusheen"
          style={{
            maxHeight: "300px",
            animation: "rotate 4s linear infinite",
            transformOrigin: "center",
          }}
        />
      </div>
      <div className="text-center justify-center">
        <h1 className="text-6xl mb-10">what do you want to learn about?</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            type="submit"
            className="text-2xl"
            onClick={() => {
              handleEnterClick(prompt);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
              borderLeft: `1px solid rgba(184, 166, 152, 0.5)`,
            }}>
            let's get started!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
