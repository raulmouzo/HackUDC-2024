'use client';

import { Chart } from "@/app/components/Chart";
import { useFile } from '../context/csvContex';

export default function Dashboard() {
  const { file, setFile } = useFile();

  return (
    <main className="flex min-h- flex-col items-center justify-between p-12 ">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Dashboard 😘
      </h1>
      <h2 className="text-2xl text-white text-center mb-10">
        Welcome to the dashboard! 🎉
      </h2>
      <Chart />

      {file && (
                <div>
                    <p>Nombre del archivo: {file.name}</p>
                    <p>Tamaño del archivo: {file.size} bytes</p>
                </div>
            )}
    </main>
  );
}
