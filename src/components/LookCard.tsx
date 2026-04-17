export default function LookCard({ look, featured = false }: { look: any; featured?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] bg-surface-container transition-all hover:-translate-y-2 duration-300 ${featured ? 'md:col-span-8 aspect-16/10 md:h-[500px]' : 'md:col-span-4 h-[400px]'
        }`}
    >
      <img
        src={look.image}
        alt={look.title}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-80" />

      <div className="absolute top-6 right-6">
        <div className="glass-panel px-4 py-3 rounded-2xl flex flex-col items-center">
          <span className="text-[10px] font-bold text-primary font-sans uppercase tracking-widest leading-none mb-1">Match Accuracy</span>
          <span className={`${featured ? 'text-3xl' : 'text-xl'} font-display font-extrabold text-on-surface`}>{look.accuracy}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        {look.series && (
          <span className="text-primary font-display font-bold text-sm tracking-[0.2em] uppercase mb-2 block">{look.series}</span>
        )}
        <h2 className={`${featured ? 'text-4xl' : 'text-2xl'} font-display font-bold text-on-surface mb-4`}>{look.title}</h2>

        {featured && (
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl text-sm hover:brightness-110 transition-all font-sans">
              Try In AR
            </button>
            <button className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all">
              <span className="material-symbols-outlined text-white">favorite</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
