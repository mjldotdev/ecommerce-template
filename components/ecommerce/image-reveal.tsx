"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  alt: string;
  /** aspect ratio class e.g. "aspect-[4/5]" */
  aspectClass?: string;
  children?: React.ReactNode;
  className?: string;
  /** Direction the clip reveals from. Default: "left" */
  direction?: "left" | "right" | "top" | "bottom";
  priority?: boolean;
  sizes?: string;
  src: string;
  /** ScrollTrigger start. Default: "top 85%" */
  start?: string;
}

const clipStart: Record<string, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(100% 0 0 0)",
  bottom: "inset(0 0 100% 0)",
};

export default function ImageReveal({
  src,
  alt,
  aspectClass = "aspect-[4/5]",
  className,
  direction = "left",
  sizes = "50vw",
  priority = false,
  start = "top 85%",
  children,
}: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) {
        return;
      }
      const img = wrap.querySelector(".ir-img");

      gsap.from(wrap, {
        clipPath: clipStart[direction],
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: { trigger: wrap, start },
      });
      if (img) {
        gsap.from(img, {
          scale: 1.1,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start },
        });
      }
    },
    { scope: wrapRef }
  );

  return (
    <div
      className={cn("relative overflow-hidden", aspectClass, className)}
      ref={wrapRef}
    >
      <Image
        alt={alt}
        className="ir-img object-cover"
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
      {children}
    </div>
  );
}
