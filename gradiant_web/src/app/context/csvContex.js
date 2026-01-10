"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FileContext = createContext(null);

export function FileProvider({ children }) {
  const [file, setFileState] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const storageKey = "wattcheck.csv";

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      setIsReady(true);
      return;
    }

    try {
      const { name, text, type } = JSON.parse(stored);
      if (typeof text === "string") {
        const restoredFile = new File([text], name || "consumption.csv", {
          type: type || "text/csv",
        });
        setFileState(restoredFile);
      }
    } catch (error) {
      console.error("[FileProvider] Failed to restore CSV from storage.", error);
    } finally {
      setIsReady(true);
    }
  }, []);

  const setFile = async (nextFile) => {
    setFileState(nextFile);
    if (!nextFile) {
      localStorage.removeItem(storageKey);
      return;
    }
    try {
      const text = await nextFile.text();
      const payload = JSON.stringify({
        name: nextFile.name,
        type: nextFile.type,
        text,
      });
      localStorage.setItem(storageKey, payload);
    } catch (error) {
      console.error("[FileProvider] Failed to persist CSV.", error);
    }
  };

  const value = useMemo(
    () => ({ file, setFile, isReady }),
    [file, isReady]
  );

  return (
    <FileContext.Provider value={value}>
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
