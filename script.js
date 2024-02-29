const fetchAndReplace = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const newDocument = parser.parseFromString(text, "text/html");

  document.head.innerHTML = newDocument.head.innerHTML;
  document.body.innerHTML = newDocument.body.innerHTML;
};

document.addEventListener("click", function (e) {
  if (!e.target) return;
  if (e.target.tagName === "A") {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    let url = null;
    try {
      url = new URL(href);
    } catch (e) {}

    if (url && url.origin !== window.location.origin) {
      window.open(href, "_blank");
      return;
    }

    const extension = href.split(".").pop();
    if (extension && extension !== "html" && extension !== "htm") {
      window.open(href, "_blank");
      return;
    }

    window.history.pushState({}, "", href);
    fetchAndReplace(href);
  }
});

window.addEventListener("popstate", () => {
  fetchAndReplace(window.location.href);
});
