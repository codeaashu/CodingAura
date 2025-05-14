import { formatNumber } from "@/utils/calc";
import { Flame } from "lucide-react";
import Image from "next/image";
import React from "react";

const CurrentStreak = ({
  classname,
  streak,
  start,
  end,
}: {
  streak: number;
  start: string | null;
  end: string | null;
  classname?: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-5 max-lg:p-3 bg-black/90 z-[90]  group cursor-pointer`}
    >
      <Image
        src={`/assets/frame9.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 top-1 -z-10 rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="relative items-center justify-center">
        <div className=" absolute inset-1/2 size-24 -z-10 bg-gradient-to-tr from-blue-700/70 blur-[18px] rounded-full to-blue-900/30 transform -translate-x-1/2 -translate-y-1/2 group-hover:from-blue-700/90 group-hover:to-blue-900/70"></div>
        <Flame className="size-14" />
      </div>
      <p className=" font-modernbold text-lg lg:text-xl ">Current Streak</p>
      <p className="font-modernbold text-7xl  ">{formatNumber(streak)}</p>
      <p className="text-xs font-modernreg">
        {streak > 0 ? <>{end} - {start}</> : "No current streak"}
      </p>
    </div>
  );
};

export default CurrentStreak;