import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const TemplateContainer = ({ children }: Props) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "92vh",
    }}>
    {children}
  </div>
);
