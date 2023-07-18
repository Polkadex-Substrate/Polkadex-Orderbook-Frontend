import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";

import * as S from "./styles";

export const QrCode = ({ mnemoicString }) => {
  const componentRef = useRef(null);

  useEffect(() => {
    const opts = {
      drawer: "svg",
      width: 150,
      height: 150,
      text: mnemoicString,
      logo: "/img/PolkadexIcon.svg",
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const qrcode = new QRCode(componentRef?.current, opts);
    const blob = new Blob([componentRef?.current.innerHTML], { type: "image/svg+xml" });

    const downloadlink = window.URL.createObjectURL(blob);
    window.URL.revokeObjectURL(downloadlink);
  }, [mnemoicString]);

  return <S.Wrapper ref={componentRef} />;
};
