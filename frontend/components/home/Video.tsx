import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const Video = () => {
    const containerRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, { scope: containerRef });

    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            <video ref={containerRef} autoPlay muted loop playsInline id="myVideo" className="w-full h-full object-cover">
                <source src="/videos/landing-page-video.mp4" type="video/mp4" />
            </video>
        </section>
    )
}

export default Video