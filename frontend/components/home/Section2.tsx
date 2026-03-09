
const Section2 = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-20 z-10 py-20 md:py-40 bg-zinc-950/80 backdrop-blur-md border-y border-white/5">
            <div className="bg-transparent w-full">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-24">
                    <div className="w-full md:w-2/3">
                        <h2 className="text-xl md:text-3xl font-light leading-[0.9]  tracking-tighter mb-8 text-black snake-title transition-colors duration-500">
                            Snake-like Robotic Arm
                        </h2>
                        <p className="text-2xl md:text-6xl font-bold leading-tight text-black snake-desc transition-colors duration-500">
                            Robotic arms designed to inspect tight spaces within complex machinery
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2