import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Section2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // 1. Text reveal background animation (previously in page.tsx)
        const snakeTexts = gsap.utils.toArray(".snake-title, .snake-desc");
        snakeTexts.forEach((el: any) => {
            gsap.to(el, {
                backgroundPositionX: "0%",
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    end: "top 20%",
                    scrub: true,
                },
            });
        });

        // 2. Character-by-character fill animations
        // TITLE animation
        const titleText = titleRef.current?.innerText || "";
        if (titleRef.current) {
            titleRef.current.innerHTML = titleText
                .split("")
                .map(
                    (char) =>
                        `<span class="inline-block title-char" style="--fill-progress:0%">
            ${char === " " ? "&nbsp;" : char}
          </span>`
                )
                .join("");

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

        // DESCRIPTION animation
        const descText = descRef.current?.innerText || "";
        if (descRef.current) {
            descRef.current.innerHTML = descText
                .split("")
                .map(
                    (char) =>
                        `<span class="inline-block desc-char" style="--fill-progress:0%">
            ${char === " " ? "&nbsp;" : char}
          </span>`
                )
                .join("");

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
            <div className="mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-26 relative">

                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 md:w-2/3 w-full">
                    <div className="md:w-[80%]">
                        <h2
                            ref={titleRef}
                            className="text-xl md:text-3xl leading-[1.1] tracking-[0.3em] mb-8"
                        >
                            Snake-like Robotic Arm
                        </h2>

                        <p
                            ref={descRef}
                            className="text-3xl md:text-7xl text-wrap wrap-normal font-bold leading-[1.1] tracking-wider"
                        >
                            Robotic arms designed  to inspect tight spaces within complex machinery
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Section2;