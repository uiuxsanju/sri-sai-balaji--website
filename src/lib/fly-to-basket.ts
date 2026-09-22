/**
 * "Fly to cart" animation, as on Flipkart / Meesho: a copy of the product photo shrinks
 * and flies from the product image into the header basket icon, which then bounces.
 *
 * Pure DOM + Web Animations API — no dependency.
 *
 * On phones the product photo has usually scrolled off screen by the time the visitor
 * reaches the button, so the flight then starts from the button itself (as Flipkart does
 * on mobile), carrying a thumbnail of the product.
 */
function visibleRatio(r: DOMRect): number {
  const h = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  return r.height ? Math.max(0, h) / r.height : 0;
}

export function flyToBasket(fromEl?: HTMLElement | null) {
  if (typeof window === "undefined") return;

  // Header has one basket for mobile and one for desktop — use the visible one.
  const target = [
    ...document.querySelectorAll<HTMLElement>("[data-basket-target]"),
  ].find((el) => el.offsetWidth > 0);
  if (!target) return;
  const to = target.getBoundingClientRect();
  if (!to.width) return;

  const photo = document.querySelector<HTMLImageElement>(
    "[data-product-image] img",
  );
  const photoRect = photo?.getBoundingClientRect();
  const photoVisible = !!photoRect && visibleRatio(photoRect) >= 0.5;

  const origin = photoVisible ? photoRect! : fromEl?.getBoundingClientRect();
  if (!origin || !origin.width) return;
  const from = origin;

  // Thumbnail size: large when flying from the photo, small from the button.
  const size = photoVisible ? Math.min(from.width, from.height, 220) : 64;
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

  if (photo?.currentSrc) {
    const img = document.createElement("img");
    img.src = photo.currentSrc;
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
  const scaleEnd = Math.max(0.12, 30 / size);

  // Curved path: rise a little first, then drop into the basket.
  const flight = ghost.animate(
    [
      {
        transform: "translate(0,0) scale(1)",
        opacity: 1,
        borderRadius: "16px",
      },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 60}px) scale(${photoVisible ? 0.55 : 1.1})`,
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
