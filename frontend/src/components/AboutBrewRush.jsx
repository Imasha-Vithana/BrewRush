import { ArrowUpRight, Coffee, Heart, MapPin } from "lucide-react";

function AboutBrewRush() {
  return (
    <section
      id="about"
      className="bg-[#FAF7F2] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

          {/* Visual side */}
          <div className="relative lg:col-span-6">

            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-[#E7D4BC]">

              {/* Large decorative circle */}
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#C5A98D]" />

              <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#D2B79B]/50" />

              {/* Main coffee visual */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                <div className="relative">

                  {/* Saucer */}
                  <div className="absolute -bottom-7 left-1/2 h-8 w-64 -translate-x-1/2 rounded-full bg-[#BFA997] shadow-lg" />

                  {/* Cup */}
                  <div className="relative h-64 w-48 rounded-b-[4rem] rounded-t-2xl bg-[#FAF7F2] shadow-2xl">

                    {/* Coffee */}
                    <div className="absolute left-1/2 top-4 h-8 w-40 -translate-x-1/2 rounded-full bg-[#24150F]" />

                    {/* Coffee crema */}
                    <div className="absolute left-1/2 top-6 h-3 w-28 -translate-x-1/2 rounded-full bg-[#6B4226]" />

                    {/* Cup highlight */}
                    <div className="absolute left-7 top-16 h-28 w-2 rounded-full bg-white/70" />

                    {/* Handle */}
                    <div className="absolute -right-20 top-14 h-32 w-24 rounded-r-full border-[18px] border-[#FAF7F2]" />

                    {/* Brand */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <Coffee
                        size={30}
                        className="mx-auto text-[#A66A3F]"
                      />

                      <p className="mt-3 text-[9px] font-semibold tracking-[0.3em] text-[#6B4226]">
                        BREWRUSH
                      </p>

                      <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-[#806A5A]">
                        Specialty Coffee
                      </p>
                    </div>
                  </div>

                  {/* Steam */}
                  <div className="absolute -top-20 left-16 h-20 w-3 rotate-6 rounded-full bg-white/40 blur-sm" />
                  <div className="absolute -top-24 left-28 h-24 w-3 -rotate-3 rounded-full bg-white/35 blur-sm" />
                  <div className="absolute -top-16 left-40 h-16 w-3 rotate-6 rounded-full bg-white/30 blur-sm" />
                </div>
              </div>

              {/* Location badge */}
              <div className="absolute bottom-7 left-7 flex items-center gap-3 rounded-2xl border border-[#CDB8A3] bg-[#FAF7F2]/90 px-5 py-4 backdrop-blur-md">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
                  <MapPin size={16} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#806A5A]">
                    Brewed with intention
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3A2117]">
                    From our bar to your door
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story side */}
          <div className="lg:col-span-6 lg:pl-8">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806A5A]">
                Our story
              </p>
            </div>

            <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Coffee should be
              <br />
              more than a
              <br />
              <span className="font-serif italic text-[#6B4226]">
                daily routine.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#806A5A]">
              BrewRush started with a simple thought — a good cup of coffee
              can change the feeling of an entire day.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#806A5A]">
              We bring together carefully selected coffee, thoughtful
              preparation, and a simple delivery experience so your favourite
              drink is never too far away.
            </p>

            {/* Values */}
            <div className="mt-10 grid gap-7 border-t border-[#D8C7B5] pt-8 sm:grid-cols-2">

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                  <Heart size={18} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#3A2117]">
                  Made with care
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#806A5A]">
                  Every drink is prepared with attention to flavour, quality,
                  and the little details that matter.
                </p>
              </div>

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                  <Coffee size={18} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#3A2117]">
                  Built around coffee
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#806A5A]">
                  Simple choices, carefully crafted drinks, and an experience
                  designed around your everyday coffee moments.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="group mt-10 flex items-center gap-3 text-sm font-semibold text-[#3A2117]">
              Discover the BrewRush story

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CDB8A3] transition-all duration-300 group-hover:border-[#24150F] group-hover:bg-[#24150F] group-hover:text-[#F3E9DC]">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </button>

          </div>
        </div>

        {/* Bottom brand statement */}
        <div className="mt-20 border-t border-[#D8C7B5] pt-8">
          <div className="flex flex-col gap-4 text-sm text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">

            <span>
              Quality coffee, thoughtfully delivered.
            </span>

            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#6B4226]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
              Made for everyday moments
            </span>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutBrewRush;

