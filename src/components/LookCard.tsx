interface Look {
  id: number;
  title: string;
  series?: string;
  accuracy: string;
  image: string;
  pinterest?: string;
  category?: string;
}

export default function LookCard({ look, featured = false }: { look: Look; featured?: boolean }) {
  const pinterestUrl = look.pinterest
    ? `https://pinterest.com/search/pins/?q=${look.pinterest}`
    : `https://pinterest.com/search/pins/?q=${encodeURIComponent(look.title + " hairstyle")}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.5rem] bg-surface-container transition-all hover:-translate-y-1 duration-300 cursor-pointer ${
        featured ? "col-span-2 md:col-span-6 h-[420px] md:h-[500px]" : "col-span-1 md:col-span-4 h-[280px] md:h-[360px]"
      }`}
    >
      <img
        src={look.image}
        alt={look.title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Accuracy badge */}
      <div className="absolute top-4 right-4">
        <div className="glass-panel px-3 py-2 rounded-xl flex flex-col items-center">
          <span className="text-[8px] font-bold text-primary font-sans uppercase tracking-widest leading-none mb-0.5">Match</span>
          <span className={`${featured ? "text-2xl" : "text-lg"} font-display font-extrabold text-white`}>{look.accuracy}</span>
        </div>
      </div>

      {/* Pinterest button — appears on hover */}
      <a
        href={pinterestUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 bg-[#E60023] text-white px-3 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95"
      >
        <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
        Pinterest
      </a>

      {/* Info */}
      <div className="absolute bottom-5 left-5 right-5">
        {look.series && (
          <span className="text-primary font-sans font-bold text-[10px] tracking-[0.2em] uppercase mb-1 block opacity-80">{look.series}</span>
        )}
        <h2 className={`${featured ? "text-2xl md:text-3xl" : "text-lg"} font-display font-bold text-white mb-3 leading-tight`}>{look.title}</h2>

        {featured && (
          <div className="flex gap-2">
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#E60023] text-white font-bold rounded-xl text-xs hover:brightness-110 transition-all font-sans"
            >
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              View on Pinterest
            </a>
            <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all">
              <span className="material-symbols-outlined text-white text-sm">favorite</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
