import { useEffect, useState } from "react";

export function useSizeObserver<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  number,
] {
  const [ref, setRef] = useState<T | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.target.scrollHeight;
        setHeight(newHeight);
      }
    });
    if (ref?.offsetHeight) observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, height];
}
