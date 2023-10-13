import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

const NextImage = ({ className, src, alt, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn('object-cover', className)}
      draggable={false}
      {...props}
    />
  );
};

export default NextImage;
