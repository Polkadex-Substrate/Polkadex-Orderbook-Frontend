export function waitForDocumentReady() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      const callback = () => {
        window.removeEventListener("load", callback);
        resolve();
      };

      window.addEventListener("load", callback);
    }
  });
}
