'use client';

import { DragAndDrop } from "@/app/components/DragAndDrop";
import { FiDownload } from "react-icons/fi";



const handleDownloadCSV = async () => {
 
};



export default function Home() {
  return (
    <main className="flex min-h- flex-col items-center justify-between">
      <div class="relative flex flex-col items-center justify-center bg-white dark:bg-black transition-bg w-full h-full">
        <div class="absolute inset-0 overflow-hidden">
            <div class="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div class="flex flex-col items-center justify-center w-[95%] h-full">
          <h1 class="relative flex items-center text-5xl font-bold text-gray-800 dark:text-white dark:opacity-80 transition-colors mb-10 mt-[30vh]">
              Watt
              <span class="ml-2 rounded-xl bg-current p-2 text-[0.7em] leading-none">
                  <span class="text-white dark:text-black">Check</span>
              </span>
          </h1>
          <DragAndDrop/>
          
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300"
            style={{ marginTop: '20px' }}
          >
            <FiDownload className="text-xl" />
            Download CSV Example
          </button>


        </div>
      </div>
    </main>
  );
}
