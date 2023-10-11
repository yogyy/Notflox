import Link from 'next/link';
import * as React from 'react';

interface LTProps {
  text: any;
  maxLength: number;
  href: string;
}

export default function LongText({ text, maxLength, href }: LTProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <span>
      {isExpanded ? text : text?.slice(0, maxLength)}
      {isExpanded ? (
        <button
          className="px-2 ml-2 font-semibold text-white rounded-sm bg-black/20 hover:bg-black"
          onClick={toggleExpanded}
        >
          Read less
        </button>
      ) : (
        <Link
          href={href}
          className="px-2 ml-2 font-semibold rounded-sm text-white/90 bg-black/5 hover:bg-black/50"
          onClick={toggleExpanded}
        >
          ...Read more
        </Link>
      )}
    </span>
  );
}
