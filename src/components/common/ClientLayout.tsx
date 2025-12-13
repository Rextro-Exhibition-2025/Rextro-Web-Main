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

  return (
    <LoadingProvider>
      <PreloaderManager />
      <Navbar />
      {children}
    </LoadingProvider>
  );
};

export default ClientLayout;
