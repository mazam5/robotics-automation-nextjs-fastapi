import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Section2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // TITLE animation - wrap chars inside word spans to preserve word-wrap
        const titleText = titleRef.current?.innerText || "";
        if (titleRef.current) {
            titleRef.current.innerHTML = titleText
                .split(" ")
                .map(
                    (word) =>
                        `<span class="inline-block">${word
                            .split("")
                            .map(
                                (char) =>
                                    `<span class="inline-block title-char" style="--fill-progress:0%">${char}</span>`
                            )
                            .join("")}</span>`
                )
                .join(" "); // real space between word spans

            const chars = titleRef.current.querySelectorAll(".title-char");

            gsap.to(chars, {
                "--fill-progress": "100%",
                stagger: 0.05,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                },
            });
        }

        // DESCRIPTION animation - same pattern
        const descText = descRef.current?.innerText || "";
        if (descRef.current) {
            descRef.current.innerHTML = descText
                .split(" ")
                .map(
                    (word) =>
                        `<span class="inline-block">${word
                            .split("")
                            .map(
                                (char) =>
                                    `<span class="inline-block desc-char" style="--fill-progress:0%">${char}</span>`
                            )
                            .join("")}</span>`
                )
                .join(" ");

            const chars = descRef.current.querySelectorAll(".desc-char");

            gsap.to(chars, {
                "--fill-progress": "100%",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: descRef.current,
                    start: "top 85%",
                    end: "top 25%",
                    scrub: true,
                },
            });
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center px-4 md:px-20 z-10 py-20 md:py-40 bg-zinc-950/80 backdrop-blur-md border-y border-white/5 overflow-hidden"
        >
            <div className="mx-auto w-full relative">

                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-5xl">
                    <h2
                        ref={titleRef}
                        className="text-base md:text-2xl leading-[1.1] tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-8 text-yellow-400/80"
                    >
                        Snake-like Robotic Arm
                    </h2>

                    <p
                        ref={descRef}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-wide"
                    >
                        Robotic arms designed to inspect tight spaces within complex machinery
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section2;