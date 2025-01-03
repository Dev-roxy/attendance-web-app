"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ProgressBar = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsNavigating(true);
      NProgress.start();
    };

    const handleComplete = () => {
      setIsNavigating(false);
      NProgress.done();
    };

    // Start and stop progress bar on navigation
    router.events?.on?.("routeChangeStart", handleStart);
    router.events?.on?.("routeChangeComplete", handleComplete);
    router.events?.on?.("routeChangeError", handleComplete);

    return () => {
      router.events?.off?.("routeChangeStart", handleStart);
      router.events?.off?.("routeChangeComplete", handleComplete);
      router.events?.off?.("routeChangeError", handleComplete);
    };
  }, [router]);

  return null;
};

export default ProgressBar;
