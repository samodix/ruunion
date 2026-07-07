(function () {
  const button = document.querySelector(".ru-menu-toggle");
  const nav = document.querySelector(".ru-nav");

  if (button && nav) {
    button.addEventListener("click", function () {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  const revealItems = document.querySelectorAll("[data-ru-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const filterButtons = document.querySelectorAll("[data-ru-filter]");
  const filterItems = document.querySelectorAll("[data-ru-cats]");
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const filter = filterButton.dataset.ruFilter;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === filterButton));
      filterItems.forEach((item) => {
        const cats = item.dataset.ruCats || "";
        item.hidden = filter !== "all" && !cats.split(" ").includes(filter);
      });
    });
  });

  const drawer = document.querySelector("#ru-mini-cart");
  const overlay = document.querySelector(".ru-cart-overlay");
  const cartContent = document.querySelector("[data-ru-cart-content]");
  const cartCounters = document.querySelectorAll("[data-ru-cart-count]");
  const cartButtons = document.querySelectorAll("[data-ru-cart-open]");

  function setCartOpen(open) {
    if (!drawer || !overlay) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    overlay.hidden = !open;
    cartButtons.forEach((item) => item.setAttribute("aria-expanded", String(open)));
    document.documentElement.classList.toggle("ru-cart-lock", open);
  }

  function updateCart(payload) {
    if (!payload) return;
    if (cartContent && payload.html) cartContent.innerHTML = payload.html;
    cartCounters.forEach((counter) => {
      counter.textContent = payload.count || 0;
    });
  }

  function requestCart(action, data) {
    if (!window.ruunionCart || !ruunionCart.ajaxUrl) return Promise.reject();
    const body = new URLSearchParams({ action, nonce: ruunionCart.nonce, ...(data || {}) });
    return fetch(ruunionCart.ajaxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json || !json.success) throw new Error("cart");
        updateCart(json.data);
        return json.data;
      });
  }

  cartButtons.forEach((openButton) => {
    openButton.addEventListener("click", () => {
      setCartOpen(true);
      requestCart("ruunion_cart_get").catch(() => {});
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-ru-cart-close]")) {
      setCartOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setCartOpen(false);
  });

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".ajax_add_to_cart[data-product_id], .add_to_cart_button[data-product_id]");
    if (!addButton || !window.ruunionCart || !ruunionCart.wcAjaxUrl) return;
    event.preventDefault();
    addButton.classList.add("is-loading");
    addButton.setAttribute("aria-busy", "true");
    const endpoint = ruunionCart.wcAjaxUrl.replace("%%endpoint%%", "add_to_cart");
    const body = new URLSearchParams({
      product_id: addButton.dataset.product_id,
      quantity: addButton.dataset.quantity || "1",
    });
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body,
      credentials: "same-origin",
    })
      .then(() => requestCart("ruunion_cart_get"))
      .then(() => setCartOpen(true))
      .catch(() => {
        window.location.href = addButton.href;
      })
      .finally(() => {
        addButton.classList.remove("is-loading");
        addButton.removeAttribute("aria-busy");
      });
  });

  document.addEventListener("click", (event) => {
    const qtyButton = event.target.closest("[data-ru-cart-qty]");
    const removeButton = event.target.closest("[data-ru-cart-remove]");
    if (!qtyButton && !removeButton) return;
    const item = event.target.closest("[data-cart-key]");
    if (!item) return;
    const key = item.dataset.cartKey;
    const current = parseInt(item.querySelector(".ru-mini-cart__qty span")?.textContent || "1", 10);
    const next = removeButton ? 0 : Math.max(0, current + parseInt(qtyButton.dataset.ruCartQty || "0", 10));
    item.classList.add("is-loading");
    requestCart("ruunion_cart_update", { cart_key: key, quantity: String(next) }).catch(() => {
      item.classList.remove("is-loading");
    });
  });
})();
