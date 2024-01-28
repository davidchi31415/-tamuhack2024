"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterClick = () => {
    // Handle enter button click here
    console.log("Enter button clicked");
  };

  return (
    <div>
      <div
        className="text-center my-20"
        style={{ display: "flex", justifyContent: "center" }}>
        <img src="/Pusheen.png" alt="Pusheen" style={{ maxHeight: "300px" }} />
      </div>
      <div className="text-center justify-center">
        <h1 className="text-6xl mb-10">what do you want to learn about?</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="enter a topic"
            className="text-2xl"
            style={{
              width: "30%",
              height: "3em",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              borderRadius: "10px 0 0 10px",
              color: "#5E5349",
            }}
          />
          <Button
            type="submit"
            className="text-2xl"
            style={{
              height: "3em",
              borderRadius: "0 10px 10px 0",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",

              borderLeft: `1px solid rgba(184, 166, 152, 0.5)`,
            }}>
            submit
          </Button>
        </div>
        <div className="sugestionContainer my-10 mx-auto gap-10" style={{ display: "flex", flexWrap: "wrap", width: "35%", justifyContent: "center"}}>
          <div style={{ flex: "0 0 15%"}}>Do plants Eat?</div>
          <div style={{ flex: "0 0 15%"}}>Do plants Eat?</div>
          <div style={{ flex: "0 0 15%"}}>Do plants Eat?</div>
          <div style={{ flex: "0 0 15%"}}>Do plants Eat?</div>
          <div style={{ flex: "0 0 15%"}}>Do plants Eat?</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
