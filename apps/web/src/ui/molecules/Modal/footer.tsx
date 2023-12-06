import { normalizeValue } from "@/utils/normalize";

export const Footer = ({ children }) => {
  return (
    <div style={{ padding: `${normalizeValue(1)} ${normalizeValue(2)}` }}>
      {children}
    </div>
  );
};
