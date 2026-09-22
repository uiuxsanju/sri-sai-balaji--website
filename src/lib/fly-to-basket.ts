/**
 * "Fly to cart" animation, as on Flipkart / Meesho: a copy of the product photo shrinks
 * and flies from the product image into the header basket icon, which then bounces.
 *
 * Pure DOM + Web Animations API — no dependency. Does nothing when the visitor prefers
 * reduced motion, or when either end of the flight isn't on screen.
 */
export function flyToBasket() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = document.querySelector<HTMLElement>("[data-basket-target]");
  const source =
    document.querySelector<HTMLElement>("[data-product-image] img") ??
    document.querySelector<HTMLElement>("[data-product-image]");
  if (!target || !source) return;

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (!from.width || !to.width) return;

  // Start from a square in the centre of the image, capped so it looks like a thumbnail.
  const size = Math.min(from.width, from.height, 220);
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const endX = to.left + to.width / 2 - size / 2;
  const endY = to.top + to.height / 2 - size / 2;

  const ghost = document.createElement("div");
  ghost.setAttribute("aria-hidden", "true");
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: "80",
    pointerEvents: "none",
    borderRadius: "16px",
    background: "var(--card)",
    boxShadow: "0 12px 30px rgba(0,0,0,.25)",
    overflow: "hidden",
    willChange: "transform, opacity",
  } satisfies Partial<CSSStyleDeclaration>);

  if (source instanceof HTMLImageElement && source.currentSrc) {
    const img = document.createElement("img");
    img.src = source.currentSrc;
    img.alt = "";
    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "8%",
    });
    ghost.appendChild(img);
  }
  document.body.appendChild(ghost);

  const dx = endX - startX;
  const dy = endY - startY;
  const scaleEnd = Math.max(0.12, 36 / size);

  // Curved path: rise a little first, then drop into the basket.
  const flight = ghost.animate(
    [
      {
        transform: "translate(0,0) scale(1)",
        opacity: 1,
        borderRadius: "16px",
      },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 60}px) scale(0.55)`,
        opacity: 1,
        offset: 0.45,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(${scaleEnd})`,
        opacity: 0.4,
        borderRadius: "999px",
      },
    ],
    {
      duration: 750,
      easing: "cubic-bezier(.45,.05,.55,.95)",
      fill: "forwards",
    },
  );

  flight.onfinish = () => {
    ghost.remove();
    target.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.25) rotate(-8deg)" },
        { transform: "scale(0.92) rotate(6deg)" },
        { transform: "scale(1)" },
      ],
      { duration: 450, easing: "ease-out" },
    );
  };
}
