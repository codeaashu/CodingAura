"use client";

import React, { useEffect, useRef, useState } from "react";
import Followers from "./Github Components/Followers";
import LongestStreak from "./Github Components/LongestStreak";
import Stars from "./Github Components/Stars";
import CurrentStreak from "./Github Components/CurrentStreak";
import Repos from "./Github Components/Repos";
import Commit from "./Github Components/Commits";
import PRs from "./Github Components/PRs";
import Issues from "./Github Components/Issues";
import ContributedTo from "./Github Components/ContributedTo";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  backgroundState,
  graphState,
  loadingState,
  usernameState,
  userStatsState,
} from "@/Recoil/State/atom";
import { UserStats } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const Github = () => {
  const userStats = useRecoilValue(userStatsState) as UserStats;
  const graph = useRecoilValue(graphState);
  const loading = useRecoilValue(loadingState);
  const username = useRecoilValue(usernameState);
  const [background, setBackground] = useRecoilState(backgroundState);
  const [selectedImage, setSelectedImage] = useState<string>("/assets/black.png");

  const githubRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = async () => {
    toast({ title: "Starting Download...", generating: true });

    const node = document.getElementById("github-ss") as HTMLElement;
    if (!node) return toast({ title: "Failed to find element." });

    toPng(node, { quality: 0.89 })
      .then(async (dataUrl) => {
        const base64Data = dataUrl.split(",")[1];
        toast({ title: "Downloading...", generating: true });
        const response = await fetch("/api/change-background", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foregroundPath: base64Data,
            backgroundPath: background,
          }),
        });
        toast({ title: "Downloading...", generating: true });
        if (response.ok) {
          const data = await response.blob();
          const link = document.createElement("a");
          const url = URL.createObjectURL(data);
          toast({ title: "Downloading...", generating: true });
          link.href = url;
          link.download = `${username || "user"}.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast({ title: "Aura Downloaded Successfully" });
        } else {
          toast({ title: "Error: Slow Internet" });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({ title: "Error occurred while downloading." });
      });
  };

  useEffect(() => {
    if (!loading && githubRef.current) {
      githubRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div className="relative w-full">
      {!loading && (
        <div className="absolute top-10 z-20 right-0 max-sm:right-[4.2rem] max-sm:top-2">
          <Select
            onValueChange={(value) => {
              const imageMap: Record<string, string> = {
                apple: "/assets/BG1.png",
                banana: "/assets/BG5.png",
                blueberry: "/assets/BGG3.png",
                grapes: "/assets/black.png",
              };
              setSelectedImage(imageMap[value]);
              setBackground(imageMap[value]);
            }}
          >
            <SelectTrigger className="p-2 relative rounded-full overflow-hidden">
              <Image
                src={selectedImage} // Dynamically show the selected image
                alt="Selected"
                width={100}
                height={100}
                className="size-7 rounded-full object-cover"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  <Image
                    src={`/assets/BG1.png`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="banana">
                  {" "}
                  <Image
                    src={`/assets/BG5.png`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="blueberry">
                  {" "}
                  <Image
                    src={`/assets/BGG3.png`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="grapes">
                  {" "}
                  <Image
                    src={`/assets/black.png`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      <div
  id="github-ss"
  ref={githubRef}
  className="relative w-full flex items-center justify-center bg-transparent"
  style={{
    backgroundImage: `url(${selectedImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        {!loading && (
          <div
            className="text-white z-10 w-full lg:w-[100%] max-w-6xl mx-auto flex items-start justify-start flex-col p-3 relative pt-[3.5rem] "
          >
            <div className="flex items-center justify-center gap-4 sm:px-10 px-3  mb-2">
              <div className="">
                <Image
                  src={userStats.AvatarUrl || "/assets/user.svg"}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full size-12 -translate-y-1 object-cover"
                />
              </div>
              <h1 className="font-modernbold leading-tight text-3xl max-w-2xl py-1">
                {userStats.Repositories ? username : "User not found"}{" "}
                {userStats.Repositories && "'s Aura."}
              </h1>
            </div>
            <div className="grid grid-cols-4 grid-rows-4 md:grid-cols-8 md:grid-rows-4 gap-2 w-full md:h-[600px] max-sm:min-h-[100vh]">
              <LongestStreak
                streak={userStats["Longest Streak"] || 0}
                start={userStats["Longest Streak Start"] || ""}
                end={userStats["Longest Streak End"] || ""}
                classname="p-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 col-start-3 col-end-5 "
              />
              <CurrentStreak
                streak={userStats["Current Streak"] || 0}
                start={userStats["Current Streak Start"] || ""}
                end={userStats["Current Streak End"] || ""}
                classname="p-2 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-4 col-start-2 col-end-5"
              />
              <Followers
                followers={userStats.Followers || 0}
                classname="p-2 md:col-start-7 md:col-end-9 md:row-start-4 md:row-end-5 row-start-4 row-end-4 col-start-2 col-end-3"
              />
              <Repos
                repos={userStats.Repositories || 0}
                classname="p-2 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-2 col-start-4 col-end-5 row-start-3 row-end-5"
              />
              <Commit
                commits={userStats["Total Contibutions"] || 0}
                classname="p-2 md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 col-start-1 col-end-4 row-start-3"
              />
              <PRs
                pr={userStats["Pull Requests"] || 0}
                classname="p-2 md:col-start-7 md:col-end-8 md:row-start-2 md:row-end-4 col-start-1 col-end-2 row-start-2"
              />
              <ContributedTo
                contros={userStats["Contributed To"] || 0}
                classname="p-2 md:col-start-3 md:col-end-5 md:row-start-4 md:row-end-5"
              />
              <Issues
                issues={userStats.Issues || 0}
                classname="p-2 md:col-start-8 md:col-end-9 md:row-start-2 md:row-end-4 col-start-1 row-start-4"
              />
              <Stars
                stars={userStats["Star Earned"] || 0}
                classname="p-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-3 row-start-1"
              />
            </div>
            <div className="max-sm:px-5 mt-2 w-full max-w-2xl flex  mx-auto">
              <h1 className="max-w-2xl w-full  font-modernbold text-2xl mb-2">
                Contribution Graph:
              </h1>
            </div>
            <div className="px-5 rounded-2xl w-full mx-auto flex flex-col relative overflow-auto">
              <div className="relative max-w-2xl mx-auto">
                <div
                  className="bg-zinc-800/20 backdrop-blur-2xl border border-zinc-200/10 backdrop-saturate-200 p-3 rounded-2xl mx-auto overflow-auto max-w-2xl opacity-95 hover:opacity-100 z-[9999] cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html: graph.graph,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <Button
          onClick={handleDownloadImage}
          className="border-zinc-200/20 bg-zinc-800/20 rounded-full py-6 absolute bottom-1 right-1 group z-20 max-sm:top-2 max-sm:right-3"
        >
          <ArrowDown size={18} />
          <p className="font-modernreg text-zinc-400 max-xl:border border-zinc-200/20 max-xl:bg-primary/90 max-xl:p-1 max-xl:text-white/90 px-2 max-xl:px-3 max-xl:rounded-lg bottom-14 right-1 max-xl:absolute lg:flex max-lg:translate-y-2 max-xl:opacity-0 max-xl:group-hover:opacity-100 max-xl:group-hover:translate-y-0 duration-150 lg:group-hover:text-white/80">
            Download Your Coding Aura
          </p>
        </Button>
      )}
    </div>
  );
};

export default Github;
