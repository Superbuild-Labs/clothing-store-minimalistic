"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState } from "react";

import { PRODUCT_IMAGE_FALLBACK } from "@/lib/product-image";

interface FallbackImageProps extends Omit<ImageProps, "src"> {
  src?: string;
  fallbackSrc?: string;
}

export function FallbackImage({ src, fallbackSrc = PRODUCT_IMAGE_FALLBACK, alt, ...props }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (!src || src.trim().length === 0 || hasError) {
      return fallbackSrc;
    }
    return src;
  }, [src, fallbackSrc, hasError]);

  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
