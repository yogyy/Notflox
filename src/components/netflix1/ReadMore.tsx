import * as React from 'react';

interface LTProps {
  text: any;
  maxLength: number;
}

export default function LongText({ text, maxLength }: LTProps) {
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
          className="text-white ml-2 font-semibold bg-black/20 px-2 hover:bg-black rounded-sm"
          onClick={toggleExpanded}
        >
          Read less
        </button>
      ) : (
        <button
          className="text-white ml-2 font-semibold bg-black/20 px-2 hover:bg-black rounded-sm"
          onClick={toggleExpanded}
        >
          ...Read more
        </button>
      )}
    </span>
  );
}
