export default function Footer() {
  return (
    <div className="relative z-10 mt-16 flex flex-col items-center gap-6 border-t border-paper/15 px-6 py-8 md:flex-row md:justify-between md:px-16">
      <div className="border-l-2 border-brand-red pl-4 font-display text-lg italic leading-tight md:text-[19px]">
        &ldquo;Our stories
        <br />
        shape tomorrow.&rdquo;
      </div>

      <div className="text-center text-[11px] tracking-[0.18em] text-paper/60">
        AFRICAN CREATIVITY.
        <br />
        GLOBAL IMPACT.
      </div>

      <div className="flex flex-col items-center gap-2 md:items-end">
        <div className="flex gap-4 text-paper/60">
          {/* TODO: swap "#" for the real social handles once confirmed */}
          <a href="#" aria-label="YouTube" className="hover:text-paper">▶</a>
          <a href="#" aria-label="Instagram" className="hover:text-paper">◎</a>
          <a href="#" aria-label="TikTok" className="hover:text-paper">♪</a>
          <a href="#" aria-label="Facebook" className="hover:text-paper">f</a>
          <a href="#" aria-label="X" className="hover:text-paper">𝕏</a>
        </div>
        <small className="text-[10.5px] tracking-[0.16em] text-paper/60">
          MORE THAN ENTERTAINMENT.
        </small>
      </div>
    </div>
  );
}
