import Navbar from "@/components/Navbar";
import PillarCarousel from "@/components/PillarCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">

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
      <Footer />
    </main>
  );
}
