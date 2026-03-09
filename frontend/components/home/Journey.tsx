import React from 'react'

const Journey = () => {
    return (
        <section className="journey-section relative min-h-screen bg-zinc-950 z-10 overflow-hidden">
            <div className="absolute top-20 left-12 md:left-24">
                <span className="text-purple-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Our Evolution</span>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">Our Journey</h2>
            </div>

            <div className="journey-wrapper flex items-center h-full px-12 md:px-24 gap-12 md:gap-24 pt-40">
                <div className="journey-item shrink-0 w-[80vw] md:w-150 h-[50vh] p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-end">
                    <div className="text-blue-400 font-mono text-xl mb-4 tracking-widest">EST. 2021</div>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Inception</h4>
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                        Founded with a vision to automate the most dangerous industrial tasks, conceptually proving the external actuation mechanism.
                    </p>
                </div>

                <div className="journey-item shrink-0 w-[80vw] md:w-150 h-[50vh] p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-end">
                    <div className="text-purple-400 font-mono text-xl mb-4 tracking-widest">PHASE: ALPHA</div>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Prototype Alpha</h4>
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                        Successfully navigated a 3-inch pipe grid, outperforming traditional endoscopic tools by 300% in maneuverability.
                    </p>
                </div>

                <div className="journey-item shrink-0 w-[80vw] md:w-150 h-[50vh] p-8 md:p-12 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md flex flex-col justify-end">
                    <div className="text-indigo-400 font-mono text-xl mb-4 tracking-widest">STATUS: SCALE</div>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Global Deployment</h4>
                    <p className="text-white text-lg md:text-xl leading-relaxed opacity-80">
                        Scaling production to meet demands from the aerospace, nuclear, and maritime industries globally. The next era of inspection begins.
                    </p>
                </div>

                <div className="w-[20vw] shrink-0" /> {/* Spacer */}
            </div>
        </section>
    )
}

export default Journey