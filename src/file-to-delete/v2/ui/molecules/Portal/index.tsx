import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Props } from "./types";

export const Portal = ({ children, element = "div" }: Props) => {
  const [container] = useState(document.createElement(element));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};
