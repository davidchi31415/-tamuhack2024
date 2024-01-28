"use client";

import { FaArrowRight } from "react-icons/fa";

import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

import { Progress } from "@/components/ui/progress";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const LearnPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  const [progress, setProgress] = React.useState(5);
  const intervalId = useRef<any>(null);

  const [prompt, setPrompt] = useState("");
  const [suggestionVal1, setSuggestionVal1] = useState("how do rockets fly?");
  const [suggestionVal2, setSuggestionVal2] = useState("what is gravity?");
  const [suggestionVal3, setSuggestionVal3] = useState("do plants eat?");
  const [transcript, setTranscript] = useState("Loading transcript...");
  const [image, setImage] = useState("scene_0.jpg");

  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    const getResults = async () => {
      const res = await axios.get("/api/results", { params: { id: promptId } });
      const { videoURL, script } = res.data;
      setVideoLink(videoURL);
      setTranscript(script);
    };

    if (progress === 100) {
      if (videoLink === "") {
        getResults();
      }
    } else {
      intervalId.current = setInterval(async () => {
        await checkProgress();
      }, 5000);
    }

    return () => clearInterval(intervalId.current);
  }, [transcript, videoLink, progress]);

  const checkProgress = async () => {
    console.log("checking progress");
    let response = await axios.get("/api/status", { params: { id: promptId } });

    if (response.status === 200) {
      const newStatus = response.data.workingOn;

      if (newStatus === "DONE") {
        setProgress(100);
      } else if (newStatus === "VIDEO") {
        setProgress(75);
      } else if (newStatus === "AUDIO") {
        setProgress(50);
      } else if (newStatus === "IMAGES") {
        setProgress(25);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleEnterClick = async (prompt) => {
    if (prompt !== "") {
      console.log("submitting prompt: ", prompt);

      let res = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json());

      console.log(res.id);

      let id = res.id;

      // let id = 1;
      router.push(`/learn/?id=${id}`);
      window.location.replace(`/learn/?id=${id}`);
    } else {
      console.log("prompt is empty");
    }
  };

  const scenes = transcript.split("|||||");

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
            }}>
            <video
              controls
              src={videoLink}
              style={{ width: "600px", height: "600px" }}
            />
          </div>
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
            className="p-10 text-2xl pt-20"
            style={{
              backgroundColor: "#DACABD",
              background: "rgba(218, 202, 189, 0.5)",
              height: "100%",
              // width: "512px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              overflow: "auto", // Add this line
            }}>
            {progress < 100 ? (
              <Progress value={progress} style={{}} />
            ) : (
              <>{"\n"}{transcript}</>
            )}
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
