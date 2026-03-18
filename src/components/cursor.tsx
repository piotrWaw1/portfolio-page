import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isMobile.current = true;
      if (cursor.current) cursor.current.style.display = "none";
      if (cursorDot.current) cursorDot.current.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(cursorDot.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor.current, {
        scale: 3,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(cursorDot.current, {
        scale: 0,
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor.current, {
        scale: 1,
        backgroundColor: "transparent",
        mixBlendMode: "normal",
        opacity: 1,
        duration: 0.2,
      });
      gsap.to(cursorDot.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']",
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursor}
        className="border-primary pointer-events-none fixed top-0 left-0 z-[100] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent backdrop-blur-sm transition-opacity duration-300 md:block"
      />
      <div
        ref={cursorDot}
        className="bg-primary pointer-events-none fixed top-0 left-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 md:block"
      />
    </>
  );
}
