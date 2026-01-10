"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "../context/csvContex.js";

export const DragAndDrop = () => {
  const router = useRouter();
  const { setFile } = useFile();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const preventDefaults = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("dragover", preventDefaults);
    window.addEventListener("drop", preventDefaults);

    return () => {
      window.removeEventListener("dragover", preventDefaults);
      window.removeEventListener("drop", preventDefaults);
    };
  }, []);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name?.toLowerCase().endsWith(".csv")) {
      setError("Please upload a .csv file.");
      return;
    }
    setError("");
    setFileName(file.name);
    void setFile(file);
    router.push("/dashboard");
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer?.files?.[0];
    handleFile(file);
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  return (
    <div className="w-full max-w-3xl">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false);
          }
        }}
        onDrop={onDrop}
        className={`flex h-[40vh] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 text-center transition ${
          isDragging
            ? "border-lime-300 bg-lime-50/20"
            : "border-white/40 bg-black/20"
        }`}
      >
        <span className="text-xl font-semibold text-white">
          Drop your CSV here
        </span>
        <span className="text-sm text-white/70">or click to choose a file</span>
        {fileName ? (
          <span className="text-sm text-white/90">{fileName}</span>
        ) : null}
        {error ? <span className="text-sm text-red-200">{error}</span> : null}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Choose file
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};
