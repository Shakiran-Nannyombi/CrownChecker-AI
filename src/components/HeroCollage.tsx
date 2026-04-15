import React from 'react';

const animationStyle = `
@keyframes float-up {
  0%   { transform: translateY(0px);    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); }
  50%  { transform: translateY(-15px);  box-shadow: 0 35px 60px -15px rgba(0,0,0,0.5); }
  100% { transform: translateY(0px);    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); }
}
.animate-float-up {
  animation: float-up 6s ease-in-out infinite;
}
`;

interface HeroCollageProps {
    title: React.ReactNode;
    subtitle: string;
    stats: { value: string; label: string }[];
    images: string[];
    onCTA: () => void;
    onSecondary: () => void;
}

export default function HeroCollage({ title, subtitle, stats, images, onCTA, onSecondary }: HeroCollageProps) {
    const imgs = images.slice(0, 7);

    return (
        <>
            <style>{animationStyle}</style>
            <section className="relative w-full overflow-hidden py-20 sm:py-32">
                {/* Ambient glow blobs */}
                <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Text content */}
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-6">
                    <span className="badge">Future of Grooming</span>
                    <h1 className="display-hero text-on-surface">{title}</h1>
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-on-surface-variant font-sans leading-relaxed">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button onClick={onCTA} className="btn-primary">Try it Now</button>
                        <button onClick={onSecondary} className="btn-secondary">View Lookbook</button>
                    </div>
                </div>

                {/* Floating image collage */}
                <div className="relative z-0 mt-20 h-[560px] flex items-center justify-center">
                    <div className="relative h-full w-full max-w-6xl">
                        {/* Central */}
                        {imgs[0] && (
                            <img src={imgs[0]} alt="Main"
                                className="absolute left-1/2 top-1/2 w-[280px] h-auto -translate-x-1/2 -translate-y-1/2 rounded-[2rem] z-20 animate-float-up object-cover"
                                style={{ animationDelay: '0s' }} />
                        )}
                        {/* Top-Left */}
                        {imgs[1] && (
                            <img src={imgs[1]} alt="Style 2"
                                className="absolute left-[20%] top-[12%] w-48 h-auto rounded-[1.5rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-1.2s' }} />
                        )}
                        {/* Top-Right */}
                        {imgs[2] && (
                            <img src={imgs[2]} alt="Style 3"
                                className="absolute right-[22%] top-[8%] w-44 h-auto rounded-[1.5rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-2.5s' }} />
                        )}
                        {/* Bottom-Right */}
                        {imgs[3] && (
                            <img src={imgs[3]} alt="Style 4"
                                className="absolute right-[18%] bottom-[10%] w-56 h-auto rounded-[1.5rem] z-30 animate-float-up object-cover"
                                style={{ animationDelay: '-3.5s' }} />
                        )}
                        {/* Far-Right */}
                        {imgs[4] && (
                            <img src={imgs[4]} alt="Style 5"
                                className="absolute right-[4%] top-1/2 -translate-y-[60%] w-48 h-auto rounded-[1.5rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-4.8s' }} />
                        )}
                        {/* Bottom-Left */}
                        {imgs[5] && (
                            <img src={imgs[5]} alt="Style 6"
                                className="absolute left-[16%] bottom-[6%] w-52 h-auto rounded-[1.5rem] z-30 animate-float-up object-cover"
                                style={{ animationDelay: '-5.2s' }} />
                        )}
                        {/* Far-Left */}
                        {imgs[6] && (
                            <img src={imgs[6]} alt="Style 7"
                                className="absolute left-[4%] top-[22%] w-44 h-auto rounded-[1.5rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-6s' }} />
                        )}

                        {/* AR scan overlay on central image */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[380px] z-30 pointer-events-none flex items-center justify-center">
                            <div className="w-48 h-48 border-2 border-primary/50 rounded-full animate-pulse flex items-center justify-center">
                                <div className="w-32 h-32 border border-primary/30 rounded-full" />
                            </div>
                        </div>

                        {/* Floating accuracy badge */}
                        <div className="absolute left-1/2 translate-x-[60px] top-1/2 translate-y-[120px] z-40 glass-panel rounded-2xl px-4 py-3 border border-white/10">
                            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">Scan Status</p>
                            <p className="text-lg font-display font-bold text-on-surface">98.4% Accuracy</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 mx-auto mt-16 px-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-4xl font-display font-bold text-primary">{stat.value}</p>
                                <p className="mt-1 text-sm font-sans text-on-surface-variant">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
