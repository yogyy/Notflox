import Link from "next/link";
import * as React from "react";

interface LTProps extends React.ComponentProps<"span"> {
  text: any;
  maxLength: number;
  href: string;
}

export const LongText: React.FC<LTProps> = ({
  text,
  maxLength,
  href,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <span className={className} {...props}>
      {isExpanded ? text : text?.slice(0, maxLength)}
      {isExpanded ? (
        <button
          className="ml-2 rounded-sm bg-black/20 px-2 font-semibold text-white hover:bg-black"
          onClick={toggleExpanded}
        >
          Read less
        </button>
      ) : (
        <Link
          href={href}
          className="ml-2 rounded-sm bg-black/5 px-2 font-semibold text-white/90 hover:bg-black/50"
          onClick={toggleExpanded}
        >
          ...Read more
        </Link>
      )}
    </span>
  );
};
