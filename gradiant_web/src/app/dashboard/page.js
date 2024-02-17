'use client';

import { Chart } from "@/components/Chart";

export default function Home() {
  return (
    <main className="flex min-h- flex-col items-center justify-between p-12 ">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Dashboard 😘
      </h1>
      <h2 className="text-2xl text-white text-center mb-10">
        Welcome to the dashboard! 🎉
      </h2>
      <Chart />
    </main>
  );
}
