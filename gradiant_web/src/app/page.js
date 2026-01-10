"use client";

import Image from "next/image";
import { DragAndDrop } from "@/app/components/DragAndDrop";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative flex w-full h-full flex-col items-center justify-center bg-white dark:bg-black transition-colors">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>

        <div className="flex h-full w-[95%] flex-col items-center justify-center">
          <h1 className="relative mb-10 mt-[30vh] flex items-center text-5xl font-bold text-gray-800 transition-colors dark:text-white dark:opacity-80">
            Watt
            <span className="ml-2 rounded-xl bg-current p-2 text-[0.7em] leading-none">
              <span className="text-white dark:text-black">Check</span>
            </span>
          </h1>

          <DragAndDrop />

          <a
            href="/consumptions.csv"
            className="z-10 mt-5 flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 shadow-md transition hover:shadow-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <Download className="h-5 w-5" />
            Download CSV Example 1
          </a>

          <a
            href="/consumptions2.csv"
            className="z-10 mt-5 flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 shadow-md transition hover:shadow-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <Download className="h-5 w-5" />
            Download CSV Example 2
          </a>

          <a
            href="https://github.com/raulmouzo/HackUDC-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 flex items-center gap-2 text-gray-800 dark:text-gray-100"
          >
            <Image src="/github-mark.svg" alt="GitHub" width={20} height={20} />
          </a>
        </div>
      </div>
    </main>
  );
}
