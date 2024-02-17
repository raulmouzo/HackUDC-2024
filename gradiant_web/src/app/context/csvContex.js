// context/FileContext.js o simplemente src/FileContext.js
'use client';

import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export function useFile() {
    return useContext(FileContext);
}

export const FileProvider = ({ children }) => {
    const [file, setFile] = useState(null);

    return (
        <FileContext.Provider value={{ file, setFile }}>
            {children}
        </FileContext.Provider>
    );
};