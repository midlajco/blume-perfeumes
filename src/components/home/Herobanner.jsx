
import { Link } from "react-router-dom";

function Herobanner() {
  return (
    <section className="relative isolate min-h-[680px] h-screen max-h-[1000px] w-full overflow-hidden bg-[#e9dfd1] text-[#201c18]">

      {/* Background image */}
      <img
        src="/images/home/hero.png"
        alt="BLUME luxury fragrance collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4ede3]/60 via-[#f4ede3]/15 to-transparent" />

      {/* Main content */}
      <div className="flex h-full min-h-[680px] items-center px-6 pb-12 pt-24 sm:px-10 md:px-[6%]">
        <div className="max-w-[760px]">

          <p className="mb-6 text-[10px] uppercase tracking-[0.42em] sm:text-xs">
            Scent, reimagined
          </p>

          <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]">
            The art of
            <br />
            quiet presence.
          </h1>

          <p className="mt-6 max-w-md font-serif text-xl text-stone-700 sm:text-2xl md:text-3xl">
            Rare notes. Lasting impressions.
          </p>

          <Link
            to="/shop"
            className="group mt-10 inline-flex items-center gap-4 border-b border-stone-800 pb-3 text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-60 sm:text-xs"
          >
            Discover the collection
            <span className="text-xl transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom details */}
      <div className="absolute bottom-7 left-6 right-6 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] sm:left-10 sm:right-10 md:left-[4.5%] md:right-[4.5%]">
        <span>Eau de parfum · 50 ml</span>
        <span>01 — 03</span>
      </div>
    </section>
  );
}

export default Herobanner;
