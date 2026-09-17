import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 px-6 pt-8 md:px-16">
      <div>
        <div className="text-2xl font-bold tracking-wide">
          IFEYINW<span className="text-brand-red">A</span>
        </div>
        <div className="mt-1 text-[5px] tracking-[0.28em] text-paper/60">
          CREATE · EMPOWER · INSPIRE
        </div>
      </div>

      <div className="hidden gap-11 text-[15px] md:flex">
        <a href="#" className="relative pb-1.5 text-paper">
          Home
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-red" />
        </a>
        <a href="#about" className="text-paper/60 hover:text-paper">
          About
        </a>
        <a href="#contact" className="text-paper/60 hover:text-paper">
          Contact
        </a>
      </div>

      <div className="flex items-center gap-6">
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60"
        >
          ⌕
        </button>
  
          <Link
          href="/academy"
          className="flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white"
        >
          Get Started <span>→</span>
          </Link>
      </div>
    </nav>
  );
}
