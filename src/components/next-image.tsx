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

interface Image404Props extends React.HTMLAttributes<HTMLSpanElement> {}
const ImageNotFound = ({ className, ...props }: Image404Props) => {
  return (
    <span
      className={cn(
        "absolute rounded-sm object-fill text-center font-semibold text-primary md:rounded",
        className,
      )}
      {...props}
    >
      NOT FOUND <br />
      404
    </span>
  );
};

export { NextImage, ImageNotFound };
