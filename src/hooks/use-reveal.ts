import { useEffect } from "react";

/**
 * Progressive enhancement: `.reveal` content is visible by default (and in the
 * prerendered HTML). Elements below the fold are hidden once the script runs
 * and revealed as they scroll into view.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-pending");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) el.classList.add("reveal-pending");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
