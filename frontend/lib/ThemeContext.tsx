"use client";

import React, { createContext, useContext, useState } from "react";

type ThemeContextType = {
    isLightMode: boolean;
    setIsLightMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
