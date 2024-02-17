'use client';

import { DragAndDrop } from "@/app/components/DragAndDrop";
import { FiDownload, FiGithub } from "react-icons/fi";




export default function Home() {
  return (
    <main className="flex min-h- flex-col items-center justify-between">
      <div className="relative flex flex-col items-center justify-center bg-white dark:bg-black transition-bg w-full h-full">
        <div className="absolute inset-0 overflow-hidden">
            <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-[95%] h-full">
          <h1 className="relative flex items-center text-5xl font-bold text-gray-800 dark:text-white dark:opacity-80 transition-colors mb-10 mt-[30vh]">
              Watt
              <span className="ml-2 rounded-xl bg-current p-2 text-[0.7em] leading-none">
                  <span className="text-white dark:text-black">Check</span>
              </span>
          </h1>
          <DragAndDrop/>
          
          <a 
            href="/consumptions.csv"
            download="NombreDelArchivo.csv"
            className="flex items-center gap-2 text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 z-10"
            style={{ marginTop: '20px' }}
          >
            <FiDownload className="text-xl" />
            Download CSV Example
          </a>

          <a
            href="https://github.com/raulmouzo/HackUDC-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 "
          >
            <FiGithub className="text-xl" />
            GitHub
          </a>

        </div>
      </div>
    </main>
  );
}