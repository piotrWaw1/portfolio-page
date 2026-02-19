import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const cursor = useRef(null);
  const rafId = useRef<number>(null);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };

    moveCursor(clientX, clientY);
  };

  const moveCursor = (x: number, y: number) => {
    gsap.set(cursor.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCursor(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  });

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed z-40 h-4 w-4 rounded-xl bg-black mix-blend-difference dark:bg-white"
    />
  );
}
