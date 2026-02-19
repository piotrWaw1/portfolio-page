import React, { type ReactNode } from "react";

interface ScrollButtonProps {
  children: ReactNode;
  scrollTo: string;
  className?: string;
}

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const href = e.currentTarget.getAttribute("href");
  if (href?.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

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
