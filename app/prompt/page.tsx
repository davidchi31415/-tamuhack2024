"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");

  const suggestionVal1 = "do plants eat?";
  const suggestionVal2 = "how do rockets fly?";
  const suggestionVal3 = "what is gravity?";
  const suggestionVal4 = "how do you multiply?";
  const suggestionVal5 = "what are fractions?";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleEnterClick = async (prompt) => {
    if (prompt !== "") {
      console.log("submitting prompt: ", prompt);

      // let res = await fetch("/api/submit", {
      //   method: "POST",
      //   body: JSON.stringify({ prompt }),
      // }).then((res) => res.json());

      // console.log(res);
      
      let id = Math.floor(Date.now() / 1000);
      router.push(`/learn/?id=${id}`);
    } else {
      console.log("prompt is empty");
    }
  };

  return (
    <div style={{ backgroundColor: "#FCEFE2" }}>
      <div
        className="text-center my-20"
        style={{ display: "flex", justifyContent: "center" }}>
        <img
          // src="/Pusheen.png"
          src="/pusheen-pawing.gif"
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
          <Input
            value={prompt}
            onChange={handleInputChange}
            placeholder="enter a topic"
            className="text-2xl"
            style={{
              width: "30%",
              height: "3em",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              borderRadius: "10px 0 0 10px",
              color: "#5E5349",
              fontFamily: "Comfortaa",
            }}
          />
          <Button
            type="submit"
            className="text-2xl"
            onClick={() => {
              handleEnterClick(prompt);
            }}
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
        <div
          className="sugestionContainer my-10 mx-auto gap-10"
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "35%",
            justifyContent: "center",
          }}>
          <Button
            type="submit"
            className="text-xl"
            onClick={() => {
              handleEnterClick(suggestionVal1);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
            }}>
            {suggestionVal1}
          </Button>
          <Button
            type="submit"
            className="text-xl"
            onClick={() => {
              handleEnterClick(suggestionVal2);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
            }}>
            {suggestionVal2}
          </Button>
          <Button
            type="submit"
            className="text-xl"
            onClick={() => {
              handleEnterClick(suggestionVal3);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
            }}>
            {suggestionVal3}
          </Button>
          <Button
            type="submit"
            className="text-xl"
            onClick={() => {
              handleEnterClick(suggestionVal4);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
            }}>
            {suggestionVal4}
          </Button>
          <Button
            type="submit"
            className="text-xl"
            onClick={() => {
              handleEnterClick(suggestionVal5);
            }}
            style={{
              height: "3em",
              borderRadius: "10px",
              backgroundColor: "rgba(184, 166, 152, 0.5)",
              color: "#5E5349",
            }}>
            {suggestionVal5}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
