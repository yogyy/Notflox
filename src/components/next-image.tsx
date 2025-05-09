import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

const NextImage = ({ className, src, alt, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      unoptimized
      draggable={false}
      {...props}
    />
  );
};

interface Image404Props extends React.HTMLAttributes<HTMLSpanElement> {
  message?: string;
}
const ImageNotFound = ({ className, message, ...props }: Image404Props) => {
  return (
    <span
      className={cn(
        "absolute rounded-sm object-fill text-center font-semibold text-primary md:rounded",
        className,
      )}
      {...props}
    >
      {message || "Image not found"}
    </span>
  );
};

export { NextImage, ImageNotFound };
