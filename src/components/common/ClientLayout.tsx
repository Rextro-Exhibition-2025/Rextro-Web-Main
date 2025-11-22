"use client";

import React from "react";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import Preloader from "./Preloader";

const PreloaderManager = () => {
  const { isPreloaderFinished } = useLoading();
  if (isPreloaderFinished) return null;
  return <Preloader />;
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingProvider>
      <PreloaderManager />
      {children}
    </LoadingProvider>
  );
};

export default ClientLayout;
