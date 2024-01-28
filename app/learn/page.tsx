"use client";

import React, { useEffect } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const LearnPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  const [prompt, setPrompt] = useState("");
  const [suggestionVal1, setSuggestionVal1] = useState("how do rockets fly?");
  const [suggestionVal2, setSuggestionVal2] = useState("what is gravity?");
  const [suggestionVal3, setSuggestionVal3] = useState("do plants eat?");
  const [transcript, setTranscript] = useState(
    "This is a very long transript of the video that is SUPER interesting. I love STEM so much and I am positively enthused to be an engineer."
  );

  useEffect(() => {
    console.log(promptId);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleEnterClick = (prompt) => {
    if (prompt !== "") {
      console.log("submitting prompt: ", prompt);
      let id = Math.floor(Date.now() / 1000);
      router.push(`/learn/?id=${id}`);
    } else {
      console.log("prompt is empty");
    }
  };

  return (
    <div>
      {/* Video and Transcript */}
      <div className="flex mt-20 mb-10">
        <div
          className="Video bg-red p-10 text-center"
          style={{ height: "600px", width: "50%" }}>
          Video
        </div>
        <div
          className="Transcript p-10 text-center"
          style={{ height: "600px", width: "50%" }}>
          <div
            className="p-10 text-2xl"
            style={{
              backgroundColor: "#D9D9D9",
              height: "100%",
              borderRadius: "10px",
            }}>
            {transcript}
          </div>
        </div>
      </div>

      {/* Text Input Area */}
      <div className="text-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
