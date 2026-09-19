import Navbar from "@/components/Navbar";
import PillarCarousel from "@/components/PillarCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink">

      <Navbar />

      <section className="relative z-10 px-6 pt-14 text-center">
        <div className="text-xs tracking-[0.35em] text-paper/60">
          DIFFERENT PATHS. A BRIGHTER TOMORROW.
        </div>
        <h1 className="mt-5 font-display text-[34px] font-medium leading-tight md:text-[58px]">
          Welcome to <span className="font-bold italic text-brand-red">Ifeyinwa</span>
        </h1>
        <p className="mt-4 text-[16px] text-paper/65">
          Movies. Learning. Creators. Community. All in one place.
        </p>
      </section>

      <PillarCarousel />

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
        <small className="text-[10.5px] tracking-[0.16em] text-paper/60">
          MORE THAN ENTERTAINMENT.
        </small>
      </div>
    </div>
      <Footer />
    </main>
  );
}
