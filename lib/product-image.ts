const FALLBACK_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f3efe9"/>
        <stop offset="100%" stop-color="#e5ddd3"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="1600" fill="url(#g)"/>
    <circle cx="600" cy="640" r="210" fill="#d6cabc" opacity="0.65"/>
    <rect x="345" y="940" width="510" height="14" rx="7" fill="#958474" opacity="0.75"/>
    <rect x="410" y="980" width="380" height="14" rx="7" fill="#a59485" opacity="0.65"/>
  </svg>`,
);

export const PRODUCT_IMAGE_FALLBACK = `data:image/svg+xml;charset=UTF-8,${FALLBACK_SVG}`;

export function getSafeProductImages(images?: string[]) {
  const valid = (images ?? []).filter((image) => typeof image === "string" && image.trim().length > 0);
  return valid.length > 0 ? valid : [PRODUCT_IMAGE_FALLBACK];
}

export function getProductImage(images?: string[], index = 0) {
  const safeImages = getSafeProductImages(images);
  return safeImages[index] ?? safeImages[0];
}
