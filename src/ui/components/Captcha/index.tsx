import { memo, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";

import { setRecaptchaSuccess } from "src/modules";
import { captchaId, captchaType } from "src/api/config";

export const CaptchaComponent = (props) => {
  const dispatch = useDispatch();

  const reCaptchaRef = useRef<any>();

  useEffect(() => {
    if (props.error || props.success) {
      if (reCaptchaRef.current) {
        reCaptchaRef?.current?.reset();
      }
    }
  }, [props.error, props.success, reCaptchaRef]);

  const handleRecaptchaChange = (value: string) => {
    dispatch(setRecaptchaSuccess({ captcha_response: value }));
  };

  const renderCaptcha = () => {
    switch (captchaType()) {
      case "recaptcha":
        return (
          <div className="pg-captcha--recaptcha">
            <ReCAPTCHA
              ref={reCaptchaRef}
              sitekey={captchaId()}
              onChange={handleRecaptchaChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return renderCaptcha();
};

export const Captcha = memo(CaptchaComponent);
