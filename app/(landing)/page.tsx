"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  const intro =
    "hello!! i'm pusheen, and i make ai videos to explain any stem topic of your choice!\n click the arrow to begin :3";

  const handleEnterClick = async (prompt) => {
    router.push(`/prompt`);
  };

  return (
    <div style={{ backgroundColor: "#FCEFE2" }}>
      <div style={{height: "50px"}}></div>
      <div
        className="text-center mt-20 text-3xl mx-auto"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "#532803",
          width: "30%",
        }}>
        {intro}
      </div>
      <div
        className="text-center mt-10 mb-20"
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
