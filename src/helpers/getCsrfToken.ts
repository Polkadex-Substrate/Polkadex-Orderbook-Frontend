export const getCsrfToken = () =>
  (process.browser && localStorage.getItem("csrfToken")) || undefined;
