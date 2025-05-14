import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/Providers/Providers";
import { Toaster } from "@/components/ui/toaster";

const modernBold = localFont({
  src: "./fonts/modern-bold.otf",
  variable: "--font-modern-bold",
  weight: "900",
});
const modernMono = localFont({
  src: "./fonts/modern-mono.otf",
  variable: "--font-modern-mono",
  weight: "900",
});
const modernReg = localFont({
  src: "./fonts/modern-reg.otf",
  variable: "--font-modern-reg",
  weight: "900",
});

export const metadata: Metadata = {
  title: "Coding Aura",
  description: "Showcase Your Coding Aura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body
        className={`${modernBold.variable} ${modernMono.variable} ${modernReg.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
