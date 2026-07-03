export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(250 85% 68%)" />
          <stop offset="1" stopColor="hsl(268 78% 42%)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-gradient)" />
      <circle cx="16" cy="14.5" r="5" fill="none" stroke="white" strokeWidth="1.75" />
      <circle cx="16" cy="14.5" r="1.6" fill="white" />
      <path
        d="M8 23c1.8-3.2 4.6-4.8 8-4.8s6.2 1.6 8 4.8"
        fill="none"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
