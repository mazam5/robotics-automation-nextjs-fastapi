import React from "react";

interface CardData {
    index: string;
    title: string;
    image: string;
    accentColor: string;
    overlayColor: string;
}

const cards: CardData[] = [
    {
        index: "/001",
        title: "Inspection",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
        accentColor: "text-blue-400",
        overlayColor: "bg-blue-900/20",
    },
    {
        index: "/002",
        title: "Painting",
        image:
            "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80",
        accentColor: "text-purple-400",
        overlayColor: "bg-purple-900/20",
    },
    {
        index: "/003",
        title: "Welding",
        image:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
        accentColor: "text-orange-400",
        overlayColor: "bg-orange-900/20",
    },
];
{/* ─────────────────────────────────────────────────────────────────
          3. CAPABILITIES SECTION — FIXED
          Strategy:
          • Wrap everything in .cards-section which is [height:300vh] on desktop
            so GSAP ScrollTrigger has scroll distance to work with.
          • Inside, .cards-stage is sticky and fills 100vh — this is the viewport
            that stays on screen while the user scrolls through 300vh.
          • Each card is absolutely inset-0 inside .cards-stage so they perfectly
            overlap. GSAP animates cards 2 & 3 sliding up over card 1.
          • On mobile (<768px): section is auto height, cards stack naturally,
            GSAP does a simple fade-in per card.
      ───────────────────────────────────────────────────────────────── */}
const Capabilities: React.FC = () => {
    return (
        <section className="cards-section relative bg-black z-10 h-auto md:h-[450vh] py-20">

            {/* Mobile Title */}
            <div className="relative z-10 text-center pt-16 pb-4 md:hidden">
                <span className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase">
                    Core Competencies
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-white mt-2">
                    Capabilities
                </h2>
            </div>

            <div className="cards-stage relative md:sticky md:top-0 w-full h-auto md:h-screen overflow-hidden">

                {/* Desktop Watermark */}
                <div className="hidden md:block absolute top-8 left-0 right-0 text-center z-0 pointer-events-none select-none">
                    <span className="text-blue-500/20 font-mono text-xs tracking-[0.4em] uppercase">
                        Core Competencies
                    </span>
                    <p className="text-white/5 text-8xl font-bold tracking-tight mt-1">
                        Capabilities
                    </p>
                </div>

                {/* Cards */}
                <div className="relative w-full h-auto md:h-full flex flex-col gap-24 md:gap-0 px-4 md:px-12 lg:px-24 py-12 md:py-20">
                    {cards.map((card) => (
                        <CapabilityCard key={card.index} {...card} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Capabilities;

interface CapabilityCardProps {
    index: string;
    title: string;
    image: string;
    accentColor: string;
    overlayColor: string;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
    index,
    title,
    image,
    accentColor,
    overlayColor,
}) => {
    return (
        <div
            className="stacked-card
      relative md:absolute md:inset-x-10 lg:md:inset-x-20 md:inset-y-16
      rounded-[3rem]
      bg-zinc-950
      border border-white/5
      flex flex-col md:flex-row
      overflow-hidden
      shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
      group"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-50 grayscale contrast-125 group-hover:scale-110 transition-transform duration-3000"
                    style={{ backgroundImage: `url(${image})` }}
                />

                <div className={`absolute inset-0 ${overlayColor} mix-blend-overlay`} />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-12 md:p-20 mt-auto w-full flex justify-between items-end">
                <div>
                    <span
                        className={`font-mono ${accentColor} text-2xl tracking-widest mb-4 block`}
                    >
                        {index}
                    </span>

                    <h3 className="text-5xl md:text-8xl font-bold tracking-tighter">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};
