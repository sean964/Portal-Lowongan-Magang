import { useRouter } from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";

nProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const Loading = () =>{
    const router = useRouter();
  
    useEffect(() => {
    const handleStart = () => nProgress.start();
    const handleDone = () => nProgress.done();
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);


    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router]);


  return null

}

export default Loading