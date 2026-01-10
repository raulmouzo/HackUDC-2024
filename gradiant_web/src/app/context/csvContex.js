"use client";

import { createContext, useContext, useState } from "react";

const FileContext = createContext(null);

export function FileProvider({ children }) {
  const [file, setFile] = useState(null);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFile() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }

  return context;
}
