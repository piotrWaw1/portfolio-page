import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function HeroAnimatedCircles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);

  const addRefToCircle = (el: HTMLDivElement | null) => {
    if (!el) return;

    if (circlesRef.current.find((circle) => circle.id === el.id)) {
      return;
    }

    circlesRef.current.push(el);
  };

  const calculateSize = (container: number, circle: number) => {
    return (container - circle) / 4;
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const circle1 = circlesRef.current[0];
      const circle2 = circlesRef.current[1];
      const circle3 = circlesRef.current[2];

      const containerW = container.offsetWidth;
      const containerH = container.offsetHeight;

      gsap.to(circle1, {
        x: `random(-${calculateSize(containerW, circle1.offsetWidth)}, ${calculateSize(containerW, circle1.offsetWidth)})`,
        y: `random(-${calculateSize(containerH, circle1.offsetHeight)}, ${calculateSize(containerH, circle1.offsetHeight)})`,
        opacity: 1,
        scale: `random(0.4, 1)`,
        duration: 6,
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        ease: "back.out(1.7)"
      });

      gsap.to(circle2, {
        x: `random(-${calculateSize(containerW, circle2.offsetWidth)}, ${calculateSize(containerW, circle2.offsetWidth)})`,
        y: `random(-${calculateSize(containerH, circle2.offsetHeight)}, ${calculateSize(containerH, circle2.offsetHeight)})`,
        opacity: 1,
        scale: `random(0.8, 1.5)`,
        duration: 6,
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        ease: "back.out(1.7)"
      });

      gsap.to(circle3, {
        x: `random(-${calculateSize(containerW, circle3.offsetWidth)}, ${calculateSize(containerW, circle3.offsetWidth)})`,
        y: `random(-${calculateSize(containerH, circle3.offsetHeight)}, ${calculateSize(containerH, circle3.offsetHeight)})`,
        scale: `random(0.4, 1)`,
        duration: 6,
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        ease: "back.out(1.7)"
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        id="circle1"
        ref={(el) => addRefToCircle(el)}
        className="bg-primary/20 absolute top-1/4 right-1/4 h-72 w-72 rounded-full blur-3xl"
      ></div>
      <div
        id="circle2"
        ref={(el) => addRefToCircle(el)}
        className="bg-accent/20 absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full blur-3xl"
      ></div>
      <div
        id="circle3"
        ref={(el) => addRefToCircle(el)}
        className="bg-cyan/20 absolute top-1/2 right-1/3 h-48 w-48 rounded-full blur-3xl"
      ></div>
    </div>
  );
}
