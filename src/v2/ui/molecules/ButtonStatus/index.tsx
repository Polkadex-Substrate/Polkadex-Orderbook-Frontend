import { useEffect, useState } from "react";

import * as S from "./styles";
import * as T from "./types";

export const ButtonStatus = ({
  heading = { text: "Click Me", loading: "Waiting", success: "Order Created" },
  isSell = true,
  isLoading,
  isSuccess,
  ...props
}: T.Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoading(true);
      if (isSuccess) {
        setTimeout(() => {
          setSuccess(true);
          setTimeout(() => {
            setLoading(false);
            setSuccess(false);
          }, 1600);
        }, 3200);
      }
    }
  }, [isLoading, isSuccess, loading, success]);

  const handleChange = () => {
    if (!loading) {
      setLoading(true);
      if (isSuccess) {
        setSuccess(true);
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
        }, 1600);
      } else {
        setLoading(false);
        setSuccess(false);
      }
    }
  };
  return (
    <>
      <S.Wrapper
        onClick={handleChange}
        isLoading={loading}
        isSuccess={success}
        isSell={isSell}
        {...props}>
        <span>
          <svg>
            <use xlinkHref="#circle" />
          </svg>
          <svg>
            <use xlinkHref="#check" />
          </svg>
        </span>
        <ul>
          <li>{heading.text}</li>
          <li>{heading.loading}</li>
          <li>{heading.success}</li>
        </ul>
      </S.Wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="circle">
          <circle
            strokeWidth="1"
            strokeDashoffset="80"
            strokeDasharray="47.124"
            fill="none"
            cx="8"
            cy="8"
            r="7.5"></circle>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="check">
          <path
            id="test"
            d="M4.76499011,6.7673683 L8.2641848,3.26100386 C8.61147835,2.91299871 9.15190114,2.91299871 9.49919469,3.26100386 C9.51164115,3.27347582 9.52370806,3.28637357 9.53537662,3.29967699 C9.83511755,3.64141434 9.81891834,4.17816549 9.49919469,4.49854425 L5.18121271,8.82537365 C4.94885368,9.05820878 4.58112654,9.05820878 4.34876751,8.82537365 L2.50080531,6.97362503 C2.48835885,6.96115307 2.47629194,6.94825532 2.46462338,6.93495189 C2.16488245,6.59321455 2.18108166,6.0564634 2.50080531,5.73608464 C2.84809886,5.3880795 3.38852165,5.3880795 3.7358152,5.73608464 L4.76499011,6.7673683 Z"></path>
        </symbol>
      </svg>
    </>
  );
};
