import { formatNumber } from "@/utils/calc";
import { Command } from "lucide-react";
import Image from "next/image";
import React from "react";

const Commit = ({
  commits,
  classname,
}: {
  commits: number;
  classname: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90]  group cursor-pointer`}
    >
      <Image
        src={`/assets/grad2.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-5 left-5">
        <Command className="size-10" />
        <p className="font-modernbold text-xl pt-1">
          Total <br /> Commits
        </p>
      </div>
      <p
        className={`font-modernbold absolute bottom-5 right-5 max-lg:right-3  ${formatNumber(commits).toString().length >= 4 ? "max-lg:text-5xl" : "max-lg:text-6xl"} text-7xl` }
      >
        {formatNumber(commits)}
      </p>
    </div>
  );
};

export default Commit;
