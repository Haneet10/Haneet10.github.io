import { getImage } from "@/lib/images";

type Props = {
  image: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Keep the intrinsic aspect ratio (default) or fill the parent. */
  fill?: boolean;
  focus?: string;
};

export function Picture({ image, alt, sizes = "100vw", className = "", priority, fill, focus }: Props) {
  const img = getImage(image);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      alt={alt}
      width={img.width}
      height={img.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={focus ? { objectPosition: focus } : undefined}
      className={`${fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full"} ${className}`}
    />
  );
}
