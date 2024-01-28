"use client";

import { FaArrowRight } from "react-icons/fa";

import React, { useEffect } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

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
  const [transcript1, setTranscript1] = useState("1");
  const [transcript2, setTranscript2] = useState("2");
  const [transcript3, setTranscript3] = useState("3");
  const [transcript, setTranscript] = useState("Loading transcript...");
  const [image, setImage] = useState("scene_0.jpg");

  // const loadImage = "Pusheen.png";
  // const loadText = "Loading transcript...";

  useEffect(() => {
    console.log("jobId:", promptId);
  }, []);

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
      <Navbar />
      {/* Video and Transcript */}
      <div
        className="flex mt-10 mb-5"
        style={{
          alignItems: "center",
        }}>
        <div style={{ width: "20%" }}></div>
        <div
          className="Video bg-red p-10 text-center flex"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "650px",
            width: "30%",
          }}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "600px",
              width: "600px",
              justifyContent: "end",
              aspectRatio: "1/1",
            }}></div>
        </div>
        <div
          className="Transcript p-10 text-center"
          style={{
            height: "30em",
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div
            className="p-10 text-2xl"
            style={{
              backgroundColor: "#DACABD",
              background: "rgba(218, 202, 189, 0.5)",
              height: "100%",
              // width: "512px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto", // Add this line to center the div horizontally
            }}>
            {transcript}
          </div>
        </div>

        <div style={{ width: "20%" }}></div>
      </div>

      {/* Text Input Area */}
      <div className="text-center justify-center">
        <div className="text-3xl mb-5">continue learning?</div>
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
            let's go!
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
