import Coffee3D from "./Coffee3D";
import { ArrowRight, Star } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F3E9DC] text-[#24150F]"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D6B89A]/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#A66A3F]/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:px-8">

        {/* LEFT CONTENT */}
        <div className="relative z-10 lg:col-span-6">

          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#A66A3F]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#806A5A]">
              Specialty Coffee · BrewRush
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#24150F] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            Coffee made
            <br />
            for your
            <br />
            <span className="font-serif italic text-[#6B4226]">
              everyday moments.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-lg text-base leading-7 text-[#806A5A] sm:text-lg">
            Carefully crafted coffee, freshly prepared and delivered to your
            door. From your first morning cup to your late afternoon pause.
          </p>

          {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">

            <a
                href="#full-menu"
                className="group flex items-center gap-3 rounded-full bg-[#24150F] px-7 py-4 text-sm font-semibold text-[#F3E9DC] transition-all duration-300 hover:bg-[#6B4226]"
            >
                Order a Coffee

                <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </a>

            <a
                href="#full-menu"
                className="flex items-center gap-2 rounded-full border border-[#C8B29E] px-7 py-4 text-sm font-medium text-[#5A3828] transition-all duration-300 hover:border-[#6B4226] hover:bg-[#E8D8C5]"
            >
                Explore Menu
            </a>

            </div>

          {/* Trust details */}
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-[#806A5A]">

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-[#A66A3F]">
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
              </div>

              <span>4.9 customer rating</span>
            </div>

            <span className="hidden h-4 w-px bg-[#C8B29E] sm:block" />

            <span>Freshly prepared</span>

            <span className="hidden h-4 w-px bg-[#C8B29E] sm:block" />

            <span>Fast delivery</span>

          </div>
        </div>

        {/* RIGHT COFFEE VISUAL */}
        <div className="relative min-h-[500px] lg:col-span-6 lg:min-h-[650px]">

          {/* Decorative circle */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8B29E]/50 sm:h-[520px] sm:w-[520px]" />

          <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8D8C5] sm:h-[420px] sm:w-[420px]" />

          {/* Coffee */}
          <div className="relative z-10 h-full">
            <Coffee3D />
          </div>

          {/* Floating label */}
          <div className="absolute bottom-8 left-2 z-20 rounded-2xl border border-[#D2BEAA] bg-[#FAF7F2]/90 px-5 py-4 shadow-xl backdrop-blur-md sm:left-8">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#806A5A]">
              Today's recommendation
            </p>

            <p className="mt-1 text-sm font-semibold text-[#3A2117]">
              Signature Latte
            </p>

            <p className="mt-1 text-xs text-[#806A5A]">
              Smooth · Creamy · Balanced
            </p>

          </div>

        </div>
      </div>

      {/* Bottom brand strip */}
      <div className="border-t border-[#D2BEAA] bg-[#E8D8C5]/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 text-xs text-[#806A5A] sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <span>Roasted with intention.</span>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
            <span>Made for slow mornings & busy days</span>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;