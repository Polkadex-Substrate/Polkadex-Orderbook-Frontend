import { useEffect, useState } from "react";

const NAME = "tourInitial";
const initialValue =
  typeof window !== "undefined" && localStorage.getItem(NAME) !== "true";

export function useTour() {
  const [state, setState] = useState(initialValue);

  const handleAccept = () => {
    localStorage.setItem(NAME, "true");
    setState(false);
  };
  function checkLocalstorage() {
    const result = localStorage.getItem(NAME);
    if (result !== "true") setState(true);
  }

  useEffect(() => {
    if (!state) checkLocalstorage();
  }, [state]);

  return {
    open: state,
    onOpenChange: setState,
    onClose: handleAccept,
  };
}
