"use client";

import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Navbar from "@/components/home/Navbar";
import Section2 from "@/components/home/Section2";
import Team from "@/components/home/Team";
import UseCases from "@/components/home/UseCases";
import Video from "@/components/home/Video";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrambleTextPlugin, SplitText, TextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin, SplitText, ScrambleTextPlugin);

import { useTheme } from "@/lib/ThemeContext";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="main-container relative z-10 bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <Section2 />
      <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        <Video />
      </section>
      <UseCases />
      <Team />
      <Journey />
      <ContactSection />
      <Footer />
    </div>
  );
}