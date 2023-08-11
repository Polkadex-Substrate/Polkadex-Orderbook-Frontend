import { useEffect, useRef } from "react";

import * as S from "./styles";

export const QrCode = ({ mnemoicString }) => {
  const componentRef = useRef(null);

  useEffect(() => {
    const blob = new Blob([componentRef?.current.innerHTML], { type: "image/svg+xml" });

    const downloadlink = window.URL.createObjectURL(blob);
    window.URL.revokeObjectURL(downloadlink);
  }, [mnemoicString]);

  return <S.Wrapper ref={componentRef} />;
};
