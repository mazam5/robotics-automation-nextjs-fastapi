"use client";

import Capabilities from "@/components/home/Capabilities";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Navbar from "@/components/home/Navbar";
import Section2 from "@/components/home/Section2";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrambleTextPlugin, SplitText, TextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin, SplitText, ScrambleTextPlugin);



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Hero entrance
    gsap.fromTo(
      ".hero-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
    );

    // 2. Scrub text (legacy?)
    const scrubTexts = gsap.utils.toArray(".scrub-text");
    scrubTexts.forEach((el: any) => {
      gsap.fromTo(
        el,
        { backgroundPositionX: "100%" },
        {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1.5,
          }
        }
      );
    });

    // 2b. Snake section text reveal
    const snakeTexts = gsap.utils.toArray(".snake-title, .snake-desc");

    snakeTexts.forEach((el: any) => {
      gsap.to(el, {
        backgroundPositionX: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "top 20%",
          scrub: true,
          markers: true
        }
      });
    });

    // 3. Capabilities Cards
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stacked-card");

      cards.forEach((card, index) => {
        if (index === 0) return;

        const prevCard = cards[index - 1];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".cards-section",
            start: `top+=${(index - 1) * 33.33}% top`,
            end: `top+=${index * 33.33}% top`,
            scrub: 1,
          }
        });

        // new card slides up
        tl.fromTo(
          card,
          {
            yPercent: 100,
            opacity: 0,
            scale: 0.96
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "none"
          },
          0
        );

        // previous card fades out
        tl.to(
          prevCard,
          {
            opacity: 0.25,
            scale: 0.95,
            ease: "none"
          },
          0
        );
      });
    });
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".stacked-card");
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    // 4. Horizontal Journey
    const journeySection = document.querySelector(".journey-section");
    const journeyWrapper = document.querySelector(".journey-wrapper");
    if (journeySection && journeyWrapper) {
      gsap.to(journeyWrapper, {
        x: () => -(journeyWrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".journey-section",
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }

    // 5. Reveal sections
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 6. Parallax bg
    gsap.to(".parallax-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 60%",
      onEnter: () => setIsLightMode(true),
      onLeaveBack: () => setIsLightMode(false),
    });

    return () => {
      mm.revert();
    };

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative z-10 transition-colors duration-1000 ${isLightMode ? 'bg-white text-black' : 'bg-transparent text-white'} font-sans selection:bg-blue-500/30`}>
      <Navbar />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Snake-like Robotic Arm */}
      <Section2 />

      {/* 3. CAPABILITIES SECTION */}
      <Capabilities />

      {/* 4. Our Journey Section — Horizontal */}
      <Journey />

      {/* 5. Contact & Footer */}
      <ContactSection />
      <Footer />
    </div>
  );
}