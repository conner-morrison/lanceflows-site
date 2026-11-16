"use client";

import { useEffect } from "react";

const ANIMATION_END = "animationend";

// Plays the hero's entrance once per visit: when the slider section scrolls
// into view, the background zooms in and the text and decorations play their
// template animations (fadeInUp / fadeInRight) together. Leaving the section
// resets both, so coming back plays them once again.
export default function SliderZoomOnce({ target }: { target: string }) {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(target);
    if (!section) return;
    let wait = 0;

    const animateText = () => {
      section.querySelectorAll<HTMLElement>("[data-animation]").forEach((el) => {
        const classes = ["animated", el.dataset.animation || "fadeInUp"];
        el.classList.remove(...classes);
        void el.offsetWidth; // restart the animation
        el.style.animationDelay = el.dataset.delay || "0s";
        el.classList.add(...classes);
        el.addEventListener(ANIMATION_END, () => el.classList.remove(...classes), { once: true });
      });
    };

    const play = () => {
      // wait for the template's slider script, so the text animation it runs
      // on start-up and the zoom begin together
      if (!section.querySelector(".slider-active.slick-initialized")) {
        wait = window.setTimeout(play, 100);
        return;
      }
      section.classList.remove("lf-zoom-reset");
      void section.offsetWidth; // apply the reset before starting the zoom
      section.classList.add("lf-zoom");
      animateText();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(wait);
        if (entry.isIntersecting) {
          play();
        } else {
          section.classList.add("lf-zoom-reset");
          section.classList.remove("lf-zoom");
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => {
      window.clearTimeout(wait);
      observer.disconnect();
    };
  }, [target]);

  return null;
}
