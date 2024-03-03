const fetchAndReplace = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const newDocument = parser.parseFromString(text, "text/html");

  document.head.innerHTML = newDocument.head.innerHTML;
  document.body.innerHTML = newDocument.body.innerHTML;
};

document.addEventListener("click", function (e) {
  if (!e.target || e.target.tagName !== "A") return;
  e.preventDefault();
  const href = e.target.getAttribute("href");

  try {
    const url = new URL(href);

    if (url.origin !== window.location.origin) {
      window.open(href, "_blank");
      return;
    }
  } catch (e) {}

  if (href.includes("#")) {
    const [path, fragment] = href.split("#");
    if (path === window.location.pathname) {
      document.getElementById(fragment).scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
  }

  window.history.pushState({}, "", href);
  fetchAndReplace(href);
});

window.addEventListener("popstate", () => {
  fetchAndReplace(window.location.href);
});
