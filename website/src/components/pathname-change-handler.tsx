"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "./ui/sidebar";
import { useEffect, useState } from "react";

export function PathnameChangeHandler() {
  const pathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState(pathname);
  const { openMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (currentPathname !== pathname) {
      setCurrentPathname(pathname);
      if (openMobile) {
        setOpenMobile(false);
        console.log("close");
      }
    }
  }, [currentPathname, openMobile, pathname, setOpenMobile]);

  return null;
}
