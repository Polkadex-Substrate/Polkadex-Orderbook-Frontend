export function waitDocumentReady() {
  return new Promise((resolve, reject) => {
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

export function loadScript(src) {
  // eslint-disable-line no-param-reassign
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    let el = document.querySelector('script[src="' + src + '"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "text/javascript";
      el.async = true;
      el.src = src;
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolve(el);
      return;
    }

    el.addEventListener("error", reject);
    el.addEventListener("abort", reject);
    el.addEventListener("load", function loadScriptHandler() {
      el.setAttribute("data-loaded", true);
      resolve(el);
    });

    if (shouldAppend) document.head.appendChild(el);
  });
}
