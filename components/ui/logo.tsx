import * as React from 'react';

export function Logo({ width, height, ...rest }: React.ComponentProps<'svg'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M10.52 63.14L0 52.62l31.57-31.57c5.81 5.81 5.81 15.24 0 21.05L10.52 63.14z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M10.52 0l10.52 10.52s10.52 10.52 0 21.05L10.52 42.09s10.52-10.52 0-21.05L0 10.52 10.52 0z"
          fill="url(#paint1_linear)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1={5.2618}
          y1={57.8799}
          x2={36.8327}
          y2={26.3091}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1A249C" />
          <stop offset={1} stopColor="#2488F5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1={12.8622}
          y1={42.0945}
          x2={12.8622}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B6DCFC" />
          <stop offset={0.0216} stopColor="#BBDFFC" />
          <stop offset={0.1418} stopColor="#D4EAFD" />
          <stop offset={0.2769} stopColor="#E7F4FE" />
          <stop offset={0.4333} stopColor="#F5FAFF" />
          <stop offset={0.6305} stopColor="#FDFEFF" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H35.93V63.14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
