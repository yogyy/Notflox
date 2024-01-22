import * as React from "react";

export const Netflix: React.FC<
  React.SVGProps<SVGSVGElement> & {
    fillColor?: string;
  }
> = ({ fillColor, className, ...props }) => {
  return (
    <svg
      width={100}
      height="1.5rem"
      viewBox="0 0 500 150"
      fill={fillColor ? fillColor : "#E50914"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 9.20296e-05H26.4382L46.9374 78.5626H47.3206V9.20296e-05H66.0955V65.6251V107.297V123.163L43.9995 125.668L38.1247 107.297L31.8025 83.3438L19.1581 35.4376H18.775V129.084L0 132.102V9.20296e-05Z"
        fill="#E50914"
      />
      <path
        d="M173.194 18.7501H151.162V9.20296e-05H216.299V18.7501H194.268V114.958L173.194 115.667V18.7501Z"
        fill="#E50914"
      />
      <path
        d="M226.503 9.20296e-05H282.253V18.7501H247.577V32.8126V38.1947H274.781V56.9447H247.577V114.132L226.503 114.294V48.5072V32.8126V9.20296e-05Z"
        fill="#E50914"
      />
      <path
        d="M292.359 9.20296e-05H313.433V74.0626V95.6242H348.109V115.751C348.109 115.751 331.12 115.331 320.234 115.062C309.348 114.794 292.359 114.374 292.359 114.374V74.0626V9.20296e-05Z"
        fill="#E50914"
      />
      <path
        d="M390 117.84C376.9 117.001 355.934 116.062 355.934 116.062V100.125C355.934 100.125 355.934 40.625 355.934 30.125C355.934 19.625 355.934 9.20296e-05 355.934 9.20296e-05H387.928H419.922V15.5626V31.1251V100.125C419.922 110.625 419.922 120.09 419.922 120.09C419.922 120.09 401.889 118.602 390 117.84ZM387.928 98.125H398.848V18.7501H387.928H377.008V98.125H387.928Z"
        fill="#E50914"
      />
      <path
        d="M449.764 64.1251L426.582 9.20296e-05H448.806L462.983 42.3751H463.366L477.926 9.20296e-05H497.851L474.669 64.1251L499 131.25L477.926 127.198L461.45 85.5001H461.067L448.5 123.036L430.5 121.077L449.764 64.1251Z"
        fill="#E50914"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M141.488 117.052C141.488 117.052 121.96 118.18 109.498 119.083C119.965 118.321 130.643 117.643 141.488 117.052ZM108.568 119.151C95.9721 120.079 77.4995 121.737 77.4995 121.737C87.6053 120.791 97.9775 119.927 108.568 119.151Z"
        fill="#E50914"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.4995 100.125V121.737C87.6053 120.791 97.9775 119.927 108.568 119.151C108.719 119.139 108.87 119.128 109.019 119.117C109.178 119.106 109.336 119.094 109.494 119.083L109.498 119.083C119.965 118.321 130.643 117.643 141.488 117.052V100.125V31.125V15.5625V0L109.494 9.20296e-05L77.4995 0V30.1249V100.125ZM120.414 98.1249H109.494H98.5735V18.75H109.494H120.414V98.1249Z"
        fill="#E50914"
      />
    </svg>
  );
};
