import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import gsap from 'gsap';

function HeroPhrases() {
    const [index, setIndex] = useState(0);

    const word1Ref = useRef<HTMLSpanElement>(null);
    const word2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const animateWords = () => {
            const tl = gsap.timeline();

            tl.fromTo(
                word1Ref.current,
                { opacity: 0, y: 15, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }
            )

                .fromTo(
                    word2Ref.current,
                    { opacity: 0, y: 15, filter: "blur(8px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
                    "+=0.2" // 200ms gap
                );
        };

        animateWords();

        const interval = setInterval(() => {
            gsap.to([word1Ref.current, word2Ref.current], {
                opacity: 0,
                y: -10,
                duration: 0.4,
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % phrases.length);
                },
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <span className="inline-flex gap-16 text-white">
            <span
                ref={word1Ref}
                className="text-5xl md:text-7xl tracking-tighter font-light"
            >
                {phrases[index].word1}
            </span>

            <span
                ref={word2Ref}
                className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
                {phrases[index].word2}
            </span>
        </span>
    );
}
const Hero = () => {
    return (
        <section className="relative min-h-svh flex flex-col justify-center items-center text-center px-4 z-10 hero-section">
            <div className="parallax-bg absolute top-1/4 left-1/4 w-75 md:w-150 h-75 md:h-150 bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
            <div className="parallax-bg absolute bottom-1/4 right-1/4 w-62.5 md:w-125 h-62.5 md:h-125 bg-purple-600/10 rounded-full blur-[70px] md:blur-[100px] pointer-events-none" />


            <h1 className="hero-element text-4xl md:text-7xl lg:text-[110px] leading-none font-bold tracking-tighter mb-6 md:mb-10 max-w-6xl">
                <HeroPhrases />
            </h1>

            <div className="hero-element flex flex-wrap justify-center gap-4 mt-4 md:mt-8">
                <Link href="/team">
                    <Button className="rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-xl font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        Meet the Team <ArrowRight className="ml-2 w-4 h-4 md:w-6 md:h-6" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default Hero

const phrases = [
    {
        word1: "access",
        word2: "revolutionized",
    },
    {
        word1: "inspection",
        word2: "reimagined",
    },
    {
        word1: "welding",
        word2: "reinvented",
    },
    {
        word1: "painting",
        word2: "redefined",
    }
];