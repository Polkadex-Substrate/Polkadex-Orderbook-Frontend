import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window && window.innerWidth,
    height: window && window.innerHeight,
  });

  const handleSize = () => {
    setWindowSize({
      width: window && window.innerWidth,
      height: window && window.innerHeight,
    });
  };
  useEffect(() => {
    window && window.addEventListener("resize", handleSize);
    return () => window && window.addEventListener("resize", handleSize);
  }, []);
  return {
    width: windowSize.width,
    height: windowSize.height,
  };
}
