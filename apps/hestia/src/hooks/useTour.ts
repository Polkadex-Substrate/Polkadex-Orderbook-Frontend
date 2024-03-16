import { useEffect, useState } from "react";

const NAME = "tourInitial";

export function useTour() {
  const initialValue =
    typeof window !== "undefined" && localStorage.getItem(NAME) !== "true";

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
