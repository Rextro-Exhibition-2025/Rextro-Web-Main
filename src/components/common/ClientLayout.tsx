"use client";

import React from "react";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import Preloader from "./Preloader";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const PreloaderManager = () => {
  const { isPreloaderFinished } = useLoading();
  if (isPreloaderFinished) return null;
  return <Preloader />;
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // Hide navbar on individual game pages (e.g., /gamezone/game-1)
  // But keep it on the main gamezone page (/gamezone) if desired, or hide on all.
  // User said "for all the games", and "navbar should not show in games".
  // The game pages are /gamezone/[id].
  const isGamePage = pathname?.startsWith('/gamezone/') && pathname !== '/gamezone';

  return (
    <LoadingProvider>
      <PreloaderManager />
      {!isGamePage && <Navbar />}
      {children}
    </LoadingProvider>
  );
};

export default ClientLayout;
