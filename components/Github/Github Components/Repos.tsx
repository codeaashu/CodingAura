import { formatNumber } from "@/utils/calc";
import { BookMarked } from "lucide-react";
import Image from "next/image";
import React from "react";

const Repos = ({ repos, classname }: { repos: number; classname: string }) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <Image
        src={`/assets/grad1.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100"
      />
      <div className="absolute top-3 left-3">
        <BookMarked className="size-10" />
        <p className="font-modernbold text-lg lg:text-xl pt-1">Repos<span className="max-sm:hidden">itories</span></p>
      </div>
      <p className={` font-modernbold absolute bottom-5 right-3 text-7xl max-lg:text-6xl max-sm:text-4xl ${formatNumber(repos).toString().length >= 4 ? "max-sm:right-1": ""} `}>
        {formatNumber(repos)}
      </p>
    </div>
  );
};

export default Repos;