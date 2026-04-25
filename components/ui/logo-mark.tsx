import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  tone?: "dark" | "light";
}

export function LogoMark({ className, tone = "dark" }: LogoMarkProps) {
  const fill = tone === "light" ? "currentColor" : "currentColor";

  return (
    <svg
      className={cn("h-auto w-[136px]", className)}
      viewBox="0 0 294 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18 11H60V16.8H25.2V26.3H55.1V31.8H25.2V42.2H61.2V48H18V11Z"
        fill={fill}
      />
      <path d="M77 11H84.2V42.1H117.6V48H77V11Z" fill={fill} />
      <path
        d="M132.2 11H176.2V16.8H139.4V26.2H171.4V31.7H139.4V42.2H176.9V48H132.2V11Z"
        fill={fill}
      />
      <path
        d="M188 11H195.8L212.6 39.8L229.4 11H237L215.4 48H209.7L188 11Z"
        fill={fill}
      />
      <path
        d="M249.2 11H291.2V16.8H256.4V26.3H286.3V31.8H256.4V42.2H292.4V48H249.2V11Z"
        fill={fill}
      />
      <path d="M135.6 5.5H164.5V9.5H135.6V5.5Z" fill={fill} opacity="0.72" />
      <path d="M20 53H289" stroke="currentColor" strokeOpacity="0.18" />
    </svg>
  );
}
