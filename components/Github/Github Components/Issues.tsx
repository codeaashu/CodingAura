import { formatNumber } from "@/utils/calc";
import Image from "next/image";
import React from "react";

const Issues = ({
  issues,
  classname,
}: {
  issues: number;
  classname: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <Image
        src={`/assets/grad4.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-[0.75] group-hover:opacity-90"
      />
      <div className="absolute top-3 left-3 max-sm:top-2 max-sm:left-2">
        <Image
          src={`/icons/issues.svg`}
          alt=""
          width={100}
          height={100}
          className="size-10"
        />
        <p className="font-modernbold lg:text-xl pt-1">
        Issues
        </p>
      </div>
      <p className={`font-modernbold absolute bottom-5 right-3  max-xl:right-2  max-sm:text-4xl ${formatNumber(issues).toString().length >= 3 ? "max-lg:right-1 text-5xl max-lg:text-4xl": "max-lg:right-2 text-6xl max-lg:text-5xl"} `}>
        {formatNumber(issues)}
      </p>
    </div>
  );
};

export default Issues;