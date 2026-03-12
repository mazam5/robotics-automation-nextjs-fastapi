"use client";

import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Navbar from "@/components/home/Navbar";
import Section2 from "@/components/home/Section2";
import Team from "@/components/home/Team";
import UseCases from "@/components/home/UseCases";
import Video from "@/components/home/Video";

export default function Home() {

  return (
    <div
      className="main-container relative z-10 bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <Section2 />
      <Video />
      <UseCases />
      <Team />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
}