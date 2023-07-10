type Language = {
  code: string;
  name: string;
  countryCode: string;
  dir?: "rtl" | "ltr";
};

export const languages: Language[] = [
  {
    code: "en",
    name: "English",
    countryCode: "us",
  },
];
