'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

// 1×1 light-gray data URI used as fallback when the real image fails to load
// and no fallbackSrc is provided — avoids a 404 for /images/placeholder.jpg
const FALLBACK_DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI/wN9I5hCAAAASUVORK5CYII=';

interface ImageWithLoaderProps extends ImageProps {
  fallbackSrc?: string;
}

export default function ImageWithLoader({ src, alt, fallbackSrc, className = '', ...props }: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // When `fill` is used the caller's parent element must set position/size.
  // We render only the shimmer + Image here (no extra wrapper div) so the
  // parent's layout is not disrupted.
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse skeleton-shimmer" />
      )}
      <Image
        {...props}
        src={error ? (fallbackSrc ?? FALLBACK_DATA_URI) : src}
        alt={alt}
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100'} ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      />
    </>
  );
}