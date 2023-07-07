type Language = {
  code: string;
  name: string;
  country_code: string;
  dir?: "rtl" | "ltr";
};

export const languages: Language[] = [
  {
    code: "en",
    name: "English",
    country_code: "us",
  },
];
