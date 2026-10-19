
import React from "react";
import { Link } from "react-router-dom";

function Herobanner() {
  return (
    <section className="relative isolate min-h-[720px] h-screen w-full overflow-hidden bg-[#e9dfd1] text-stone-900">

      {/* Background image */}
      <img
        src="/images/home/hero.png"
        alt="Blume luxury fragrance collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Soft overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4ede3]/35 via-transparent to-transparent" />

      {/* Hero content */}
      <div className="flex h-full items-center px-6 pb-10 pt-24 sm:px-10 md:px-[6%]">
        <div className="max-w-[650px]">

          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] sm:text-xs">
            Scent, reimagined
          </p>

          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]">
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
