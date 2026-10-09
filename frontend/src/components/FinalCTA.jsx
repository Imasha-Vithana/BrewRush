import { ArrowRight, Coffee } from "lucide-react";

function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#3A2117] px-6 py-28 text-[#F3E9DC] lg:px-8"
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[#6B4226]/60" />

      <div className="pointer-events-none absolute -right-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-[#6B4226]/50" />

      <div className="pointer-events-none absolute right-20 top-16 h-32 w-32 rounded-full bg-[#A66A3F]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">

        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#8B624A] bg-[#24150F] text-[#C8A98D]">
          <Coffee size={24} />
        </div>

        {/* Label */}
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A98D]">
          Your next coffee is waiting
        </p>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Make your next coffee
          <br />
          <span className="font-serif italic text-[#C8A98D]">
            worth the moment.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#B9A294] sm:text-lg">
          Choose your favourite brew, make it your own, and let BrewRush
          bring a fresh cup straight to your door.
        </p>

        {/* CTA */}
        <button className="group mx-auto mt-9 flex items-center gap-3 rounded-full bg-[#F3E9DC] px-7 py-4 text-sm font-semibold text-[#24150F] transition-all duration-300 hover:bg-white hover:shadow-xl">
          Order your coffee

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {/* Bottom note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#8F786A]">
          <span>Freshly prepared</span>

          <span className="h-1 w-1 rounded-full bg-[#A66A3F]" />

          <span>Fast delivery</span>

          <span className="h-1 w-1 rounded-full bg-[#A66A3F]" />

          <span>Made with care</span>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;

