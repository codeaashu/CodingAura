import { formatNumber } from "@/utils/calc";
import { GitMerge } from "lucide-react";
import Image from "next/image";
import React from "react";

const ContributedTo = ({
  contros,
  classname,
}: {
  contros: number;
  classname: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90  z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <Image
        src={`/assets/grad11.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-xl opacity-70 group-hover:opacity-100 object-left-bottom max-sm:object-right-top"
      />
      <div className="absolute top-3 left-3 max-sm:top-2 max-sm:left-2 max-lg:flex max-md:block gap-2" >
        <GitMerge className="text-white size-10" />
        <p className="font-modernbold lg:text-lg lg:pt-0">Contrib<span className="sm:hidden">-</span> uted <br/> To:</p>
      </div>
      <p className={`font-modernbold absolute bottom-5 right-3  text-6xl max-sm:text-4xl max-lg:text-5xl ${formatNumber(contros).toString().length >= 3 ? "max-lg:right-1": "max-lg:right-2"} `}>{formatNumber(contros)}</p>
    </div>
  );
};

export default ContributedTo;