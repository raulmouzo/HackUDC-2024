'use client';

import { DragAndDrop } from "@/app/components/DragAndDrop";

export default function Home() {
  return (
    <main className="flex min-h- flex-col items-center justify-between p-12 ">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Empower Your Energy Insight with Gradient ⚡
      </h1>
      <h2 className="text-2xl text-white text-center mb-10">
        Transform your electricity data into actionable intelligence to save energy and reduce costs.
      </h2>
      <DragAndDrop />
    </main>
  );
}
