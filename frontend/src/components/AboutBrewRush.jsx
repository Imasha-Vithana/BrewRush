import { ArrowUpRight, Coffee, Heart, MapPin } from "lucide-react";

function AboutBrewRush() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#FAF7F2] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Real coffee photo */}
          <div className="relative lg:col-span-6">
            {/* Added overflow-hidden to contain all absolute elements */}
            <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-[#E7D4BC] sm:min-h-[560px]">
              <img
                src="/images/about-barista.jpg"
                alt="A freshly prepared cup of cappuccino"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              {/* Decorative accent shifted inside container */}
              <div className="pointer-events-none absolute -right-5 -top-5 hidden h-28 w-28 rounded-full border border-white/40 lg:block" />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24150F]/75 via-[#24150F]/10 to-[#24150F]/5" />

              {/* Decorative border */}
              <div className="pointer-events-none absolute inset-5 rounded-[1.5rem] border border-white/30" />

              {/* Top label */}
              <div className="absolute left-8 top-8 rounded-full border border-white/30 bg-[#FAF7F2]/85 px-4 py-2 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B4226]">
                  The BrewRush experience
                </p>
              </div>

              {/* Bottom photo caption */}
              <div className="absolute bottom-28 left-8 right-8 sm:bottom-32 sm:left-10">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#F3E9DC]/80">
                  Pause. Sip. Repeat.
                </p>

                <h3 className="mt-3 max-w-sm font-serif text-3xl italic leading-tight text-[#FAF7F2] sm:text-4xl">
                  Your everyday coffee moment, made special.
                </h3>
              </div>

              {/* Floating location badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-[#CDB8A3]/70 bg-[#FAF7F2]/95 p-4 shadow-lg backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:min-w-[330px] sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#806A5A]">
                    Brewed with intention
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3A2117]">
                    From our bar to your door
                  </p>
                </div>

                <Coffee
                  size={20}
                  className="ml-auto shrink-0 text-[#A66A3F]"
                />
              </div>
            </div>
          </div>

          {/* Story content */}
          <div className="relative z-10 lg:col-span-6 lg:pl-6">
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

            {/* Brand values */}
            <div className="mt-10 grid gap-7 border-t border-[#D8C7B5] pt-8 sm:grid-cols-2">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                  <Heart size={19} />
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
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                  <Coffee size={19} />
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

            {/* Working navigation button */}
            <a
              href="#full-menu"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[#3A2117]"
            >
              Discover our coffee menu

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CDB8A3] transition-all duration-300 group-hover:border-[#24150F] group-hover:bg-[#24150F] group-hover:text-[#F3E9DC]">
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom brand statement */}
        <div className="mt-20 border-t border-[#D8C7B5] pt-8">
          <div className="flex flex-col gap-4 text-sm text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">
            <span>Quality coffee, thoughtfully delivered.</span>

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