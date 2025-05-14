import { formatNumber } from "@/utils/calc";
import Image from "next/image";
import React from "react";

const PRs = ({ pr, classname }: { pr: number; classname: string }) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90  z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <Image
        src={`/assets/grad5.svg`}
        alt=""
        width={500}
        height={500}
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100 object-right-bottom"
      />
      <div className="absolute top-3 left-3">
        <Image
          src={`/icons/pr.svg`}
          alt=""
          width={100}
          height={100}
          priority
          className="size-10"
        />
        <p className="font-modernbold lg:text-xl pt-1">PRs</p>
      </div>
      <p
        className={` font-modernbold absolute bottom-5 right-3 max-lg:right-2  max-sm:text-4xl ${formatNumber(pr).toString().length >= 3 ? "max-lg:right-1 max-lg:text-4xl text-5xl": "max-lg:right-2 text-6xl max-lg:text-5xl"} `}
      >
        {formatNumber(pr)}
      </p>
    </div>
  );
};

export default PRs;
