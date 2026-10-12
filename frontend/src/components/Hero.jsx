import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F3E9DC] text-[#24150F]"
    >
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D6B89A]/25 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#A66A3F]/10 blur-3xl" />

      {/* Main hero layout */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 lg:min-h-[680px] lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-14">
        {/* LEFT: Brand introduction */}
        <div className="relative z-10 lg:col-span-6 xl:pr-5">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#A66A3F]" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#806A5A]">
              Specialty Coffee · BrewRush
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#24150F] sm:text-6xl lg:text-6xl xl:text-7xl">
            Coffee made
            <br />
            for your
            <br />

            <span className="font-serif italic text-[#6B4226]">
              everyday moments.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-7 text-[#806A5A] sm:text-lg sm:leading-8">
            Carefully crafted coffee, freshly prepared and delivered to your
            door. From your first morning cup to your late afternoon pause.
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#full-menu"
              className="group inline-flex items-center gap-3 rounded-full bg-[#24150F] px-6 py-3.5 text-sm font-semibold text-[#F3E9DC] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6B4226] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A66A3F] focus-visible:ring-offset-2 sm:px-7 sm:py-4"
            >
              Order a Coffee

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#full-menu"
              className="inline-flex items-center gap-2 rounded-full border border-[#C8B29E] px-6 py-3.5 text-sm font-medium text-[#5A3828] transition-all duration-300 hover:border-[#6B4226] hover:bg-[#E8D8C5] sm:px-7 sm:py-4"
            >
              Explore Menu
            </a>
          </div>

          {/* Brand highlights */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#806A5A] sm:mt-12 sm:gap-x-6">
            <span>Freshly prepared</span>

            <span className="hidden h-4 w-px bg-[#C8B29E] sm:block" />

            <span>Easy ordering</span>

            <span className="hidden h-4 w-px bg-[#C8B29E] sm:block" />

            <span>Made with care</span>
          </div>
        </div>

        {/* RIGHT: Large real coffee video */}
        <div className="relative mx-auto w-full max-w-[620px] lg:col-span-6 lg:max-w-none">
          {/* Soft decorative frame */}
          <div className="pointer-events-none absolute -inset-2 rounded-[2.2rem] border border-[#C8B29E]/50 sm:-inset-3" />

          {/* Video container */}
          <div className="relative h-[440px] overflow-hidden rounded-[1.8rem] bg-[#24150F] shadow-[0_24px_60px_rgba(36,21,15,0.16)] sm:h-[560px] lg:h-[610px] xl:h-[660px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/velvet-latte.jpg"
              aria-label="Fresh coffee being prepared and poured"
              className="absolute inset-0 h-full w-full object-cover object-center"
            >
              <source
                src="/videos/coffee-pouring.mp4"
                type="video/mp4"
              />
            </video>

            {/* Subtle overlay for a cinematic finish */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#24150F]/65 via-transparent to-[#24150F]/15" />

            {/* Small editorial label */}
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#24150F]/45 px-4 py-2.5 backdrop-blur-md sm:left-7 sm:top-7">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6B89A]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAF7F2]">
                  The art of coffee
                </span>
              </div>
            </div>

            {/* Video caption — no play icon */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E7D4BC] sm:text-xs">
                Freshly poured · Thoughtfully made
              </p>

              <h2 className="mt-3 max-w-sm font-serif text-3xl italic leading-tight text-[#FAF7F2] sm:text-4xl lg:text-[2.7rem]">
                Make time for a better cup.
              </h2>

              <div className="mt-5 flex items-center gap-3 text-xs text-[#F3E9DC]/80">
                <span className="h-px w-8 bg-[#C8A98D]" />

                <span>BrewRush Signature Coffee</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom brand strip */}
      <div className="mt-8 border-t border-[#D2BEAA] bg-[#E8D8C5]/40 lg:mt-12">
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