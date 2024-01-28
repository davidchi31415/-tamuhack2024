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
import { InfiniteLoaderComponent } from "@/components/loader/infinite-loader";

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
      <div className="flex items-center justify-center gap-8 py-10">
        <div className="shadow-3xl">
            {videoLink === "" ?
            <div
            style={{
              backgroundImage: "url(/Pusheen.png)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "600px",
              width: "600px",
              justifyContent: "end",
              aspectRatio: "1/1",
            }} /> :
            <video
              controls
              src={videoLink}
              style={{ width: "512px", height: "512px" }}
            />}
          </div>
          <div className="w-[512px] h-[512px] flex flex-col items-center justify-between gap-0 rounded-4">
            <div className="w-full h-[5rem] bg-[#5E5349] flex items-center justify-center font-bold text-2xl text-white">
              {progress === 100 ? "Pusheen's Adventure Story" : "Writing Pusheen's Adventure Story..."}
            </div>
            <div className="border-black h-full w-full bg-[#fafafa] shadow-3xl
              p-4
              "
            >
              {
                !transcript ?
                transcript : <div className="text-7xl flex items-center justify-center h-full text-[#5E5349]">{progress}%</div>
              }
            </div>
            <InfiniteLoaderComponent />
          </div>
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
