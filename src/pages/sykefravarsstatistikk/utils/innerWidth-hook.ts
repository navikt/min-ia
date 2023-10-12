import { useLayoutEffect, useState } from "react";

export const useInnerWidth = (): number => {
  const [innerWidth, setInnerWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => {
        setInnerWidth(window.innerWidth);
      };
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);
  return innerWidth;
};
