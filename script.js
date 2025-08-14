// ---- Recently Viewed: storage helpers ----
const RV_STORAGE_KEY = "recentlyViewed";
const RV_MAX_ITEMS = 10;

function rvGet() {
  try {
    return JSON.parse(localStorage.getItem(RV_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function rvSet(items) {
  localStorage.setItem(RV_STORAGE_KEY, JSON.stringify(items));
}

/**
 * Add/refresh a product in Recently Viewed:
 * - Removes duplicates
 * - Adds to the front (most recent first)
 * - Trims to RV_MAX_ITEMS
 */
function rvAdd(product) {
  if (!product?.id) return;

  let items = rvGet();
  items = items.filter(p => p.id !== product.id); // remove dup
  items.unshift(product);                          // most recent first
  if (items.length > RV_MAX_ITEMS) items = items.slice(0, RV_MAX_ITEMS);

  rvSet(items);
}

// ---- Render the carousel on the homepage ----
function rvRender() {
  const container = document.getElementById("recentlyViewedContainer");
  if (!container) return;

  const items = rvGet();
  if (!items.length) {
    container.innerHTML = `<p style="opacity:.8">No products viewed yet.</p>`;
    return;
  }

  container.innerHTML = items
    .map(
      (p) => `
      <a class="rv-card" href="${p.url || '#'}" title="${p.name}">
        <img class="rv-thumb" src="${p.image}" alt="${p.name}">
        <div class="rv-name">${p.name}</div>
        ${p.price ? `<div class="rv-price">₹${Number(p.price).toLocaleString('en-IN')}</div>` : ''}
      </a>
    `
    )
    .join("");
}

// ---- Click tracking on product cards ----
function wireProductClicks() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const btn = card.querySelector(".js-view");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        image: card.dataset.image,
        price: card.dataset.price ? Number(card.dataset.price) : undefined,
        url: card.dataset.url || "#",
      };

      // Save to Recently Viewed
      rvAdd(product);

      // Re-render the carousel immediately
      rvRender();

      // (Optional) Simulate navigation to product page
      // window.location.href = product.url;
    });
  });
}

// ---- Init on page load ----
document.addEventListener("DOMContentLoaded", () => {
  wireProductClicks();
  rvRender();
});
