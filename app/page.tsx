import Github from "@/components/Github/Github";
import GithubInput from "@/components/Input/GithubInput";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full min-h-screen mx-auto p-5 max-sm:p-0 flex flex-col items-center justify-center overflow-hidden relative">
      <Link
        href={`https://github.com/codeaashu`}
        className="cursor-pointer flex items-center justify-start gap-2 z-10 w-full font-modernmono text-zinc-600 hover:text-white/60 px-5 max-sm:py-3"
      >
        <h1 className="flex items-center gap-2">
          <Image
            src="/assets/CodingAura.png"
            alt="Coding Aura Logo"
            width={64}
            height={64}
            className="inline-block"
            priority
          />
          <span className="font-extrabold text-2xl">Coding Aura</span>
        </h1>
        <GithubIcon size={18} />
      </Link>
      <Image
        src={`/assets/grad1.svg`}
        alt=""
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40"
        priority
      />
      <svg
        className="pointer-events-none isolate z-[999999] size-full absolute inset-0 opacity-30 mix-blend-soft-light"
        width="100%"
        height="100%"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="h-[92vh] w-full flex items-center justify-center">
        <GithubInput />
      </div>
      <Github />
    </div>
  );
}
