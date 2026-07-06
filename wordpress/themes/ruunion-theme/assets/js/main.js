(function () {
  const button = document.querySelector(".ru-menu-toggle");
  const nav = document.querySelector(".ru-nav");

  if (!button || !nav) return;

  button.addEventListener("click", function () {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
})();
