import { handleSmoothScroll } from "@/components/sections/navbar.tsx";
import type { ReactNode } from "react";

interface ScrollButtonProps {
  children: ReactNode;
  scrollTo: string;
  className?: string;
}

export default function ScrollButton({
  children,
  scrollTo,
  className,
}: ScrollButtonProps) {
  return (
    <a href={scrollTo} onClick={handleSmoothScroll} className={className}>
      {children}
    </a>
  );
}
