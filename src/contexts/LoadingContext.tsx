"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isHeroLoaded: boolean;
  setHeroLoaded: (loaded: boolean) => void;
  isPreloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
  shouldRevealContent: boolean;
  setShouldRevealContent: (reveal: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [shouldRevealContent, setShouldRevealContent] = useState(false);

  // Fallback: If hero doesn't report loaded within 5 seconds, force it.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHeroLoaded) {
        console.warn("Hero load timeout - forcing reveal");
        setIsHeroLoaded(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isHeroLoaded]);

  return (
    <LoadingContext.Provider
      value={{
        isHeroLoaded,
        setHeroLoaded: setIsHeroLoaded,
        isPreloaderFinished,
        setPreloaderFinished: setIsPreloaderFinished,
        shouldRevealContent,
        setShouldRevealContent,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
