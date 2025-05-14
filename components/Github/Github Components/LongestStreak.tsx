import React from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { formatNumber } from "@/utils/calc";

const LongestStreak = ({
  streak,
  start,
  end,
  classname,
}: {
  streak: number;
  start: string | null;
  end: string | null;
  classname?: string;
}) => {
  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-3 z-[90] bg-black/90 group cursor-pointer`}>
        {/* <HalfCircleGradient  /> */}
        <Image
            src={`/assets/frame7.svg`}
            alt=""
            width={500}
            height={500}
            priority
            className="size-full object-cover absolute inset-0 -z-10 rounded-2xl group-hover:opacity-100 opacity-[0.88] cursor-pointer"
        />
        <p className="font-modernbold text-lg lg:text-xl">Longest Streak</p>
        <Trophy className="size-10"/>
        <p className="font-modernbold max-lg:text-6xl text-7xl">{formatNumber(streak)}</p>
        <p className="text-xs font-modernreg">{start} - {end}</p>
    </div>
  );
};

export default LongestStreak;