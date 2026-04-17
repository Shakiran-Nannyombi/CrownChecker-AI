import React from 'react';

const animationStyle = `
@keyframes float-up {
  0%   { transform: translateY(0px);    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4); }
  50%  { transform: translateY(-12px);  box-shadow: 0 30px 50px -12px rgba(0,0,0,0.5); }
  100% { transform: translateY(0px);    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4); }
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
            <section className="relative w-full overflow-hidden pt-8 pb-16">
                {/* Grid backdrop */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--color-primary) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 5%, transparent) 1px, transparent 1px)`,
                        backgroundSize: '6rem 4rem',
                    }}
                />
                {/* Radial glow — top right */}
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle 900px at 90% -5%, color-mix(in srgb, var(--color-primary-container) 55%, transparent), transparent)' }}
                />
                {/* Ambient blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Two-column layout */}
                <div className="relative z-10 mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

                    {/* Left: Text */}
                    <div className="space-y-6 text-left">

                        <h1 className="font-display font-extrabold tracking-tighter leading-[1.05] text-4xl sm:text-5xl md:text-6xl text-on-surface">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg text-on-surface-variant font-sans leading-relaxed max-w-md">
                            {subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button onClick={onCTA} className="btn-primary">Try it Now</button>
                            <button onClick={onSecondary} className="btn-secondary">View Lookbook</button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                                    <p className="text-xs font-sans text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Floating collage */}
                    <div className="relative h-[520px] w-full">
                        {/* Central */}
                        {imgs[0] && (
                            <img src={imgs[0]} alt="Main"
                                className="absolute left-1/2 top-1/2 w-[200px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] z-20 animate-float-up object-cover"
                                style={{ animationDelay: '0s' }} />
                        )}
                        {/* Top-Left */}
                        {imgs[1] && (
                            <img src={imgs[1]} alt="Style 2"
                                className="absolute left-[8%] top-[8%] w-36 h-44 rounded-[1.2rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-1.2s' }} />
                        )}
                        {/* Top-Right */}
                        {imgs[2] && (
                            <img src={imgs[2]} alt="Style 3"
                                className="absolute right-[8%] top-[5%] w-32 h-40 rounded-[1.2rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-2.5s' }} />
                        )}
                        {/* Bottom-Right */}
                        {imgs[3] && (
                            <img src={imgs[3]} alt="Style 4"
                                className="absolute right-[6%] bottom-[8%] w-40 h-48 rounded-[1.2rem] z-30 animate-float-up object-cover"
                                style={{ animationDelay: '-3.5s' }} />
                        )}
                        {/* Far-Right */}
                        {imgs[4] && (
                            <img src={imgs[4]} alt="Style 5"
                                className="absolute right-[28%] top-[4%] w-28 h-36 rounded-[1rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-4.8s' }} />
                        )}
                        {/* Bottom-Left */}
                        {imgs[5] && (
                            <img src={imgs[5]} alt="Style 6"
                                className="absolute left-[6%] bottom-[6%] w-36 h-44 rounded-[1.2rem] z-30 animate-float-up object-cover"
                                style={{ animationDelay: '-5.2s' }} />
                        )}
                        {/* Mid-Left */}
                        {imgs[6] && (
                            <img src={imgs[6]} alt="Style 7"
                                className="absolute left-[28%] top-[6%] w-28 h-36 rounded-[1rem] z-10 animate-float-up object-cover"
                                style={{ animationDelay: '-6s' }} />
                        )}

                        {/* AR scan ring on central */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[260px] z-30 pointer-events-none flex items-center justify-center">
                            <div className="w-36 h-36 border-2 border-primary/50 rounded-full animate-pulse flex items-center justify-center">
                                <div className="w-24 h-24 border border-primary/30 rounded-full" />
                            </div>
                        </div>

                        {/* Accuracy badge */}
                        <div className="absolute left-1/2 translate-x-[40px] top-1/2 translate-y-[100px] z-40 glass-panel rounded-xl px-3 py-2 border border-white/10">
                            <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-primary">Scan Status</p>
                            <p className="text-sm font-display font-bold text-on-surface">98.4% Accuracy</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
