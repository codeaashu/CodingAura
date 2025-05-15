import { formatNumber } from "@/utils/calc";
import { UserRoundCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

const Followers = ({
  followers,
  classname,
}: {
  followers: number;
  classname?: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <Image
        src={`/assets/frame2.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-100"
      />
      <div className="absolute top-3 left-3 max-sm:top-2 max-sm:left-2">
        <UserRoundCheck className="size-10" />
        <p className="font-modernbold lg:text-xl">Followers</p>
      </div>
      <p className={`font-modernbold absolute bottom-5 right-3  max-xl:right-2  max-sm:text-4xl ${formatNumber(followers).toString().length >= 3 ? "max-lg:right-2 max-sm:right-1 text-5xl max-lg:text-4xl": "max-lg:right-2 text-6xl max-lg:text-5xl"} `}>
              {formatNumber(followers)}
            </p>
    </div>
  );
};

export default Followers;