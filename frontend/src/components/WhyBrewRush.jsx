
import { Coffee, Clock3, Leaf, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Coffee,
    number: "01",
    title: "Thoughtfully crafted",
    description:
      "Every drink starts with carefully selected coffee and is prepared to bring out a smooth, balanced flavour.",
  },
  {
    icon: Clock3,
    number: "02",
    title: "Fresh to your door",
    description:
      "Your coffee is prepared when you order, so it reaches you fresh, warm, and ready to enjoy.",
  },
  {
    icon: Leaf,
    number: "03",
    title: "Quality ingredients",
    description:
      "We keep our recipes simple and focus on ingredients that make every sip taste better.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Made for your moment",
    description:
      "Whether it is your first cup or an afternoon reset, BrewRush fits naturally into your day.",
  },
];

function WhyBrewRush() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#24150F] px-6 py-24 text-[#F3E9DC] lg:px-8"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#6B4226]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C8A98D]">
                Why BrewRush
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Great coffee should feel
              <span className="font-serif italic text-[#C8A98D]">
                {" "}
                effortless.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-lg text-base leading-7 text-[#B9A294] sm:text-lg">
              From the beans we choose to the moment your order arrives,
              BrewRush is designed around one simple idea — make enjoying
              great coffee easier.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12">

          {/* Brand statement */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#6B4226] bg-[#3A2117] text-[#C8A98D]">
                <Coffee size={23} />
              </div>

              <h3 className="mt-7 max-w-sm text-2xl font-medium leading-tight text-[#F3E9DC]">
                Coffee made with intention,
                <span className="text-[#9D8373]">
                  {" "}
                  not just convenience.
                </span>
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-6 text-[#9D8373]">
                We believe delivery should never mean compromising on the
                experience of a good coffee.
              </p>

              {/* Small stats */}
              <div className="mt-10 grid grid-cols-2 border-t border-[#4A3024] pt-6">
                <div>
                  <p className="text-2xl font-semibold text-[#F3E9DC]">
                    4.9
                  </p>
                  <p className="mt-1 text-xs text-[#8F786A]">
                    Customer rating
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-[#F3E9DC]">
                    30m
                  </p>
                  <p className="mt-1 text-xs text-[#8F786A]">
                    Average delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="lg:col-span-8">
            <div className="grid border-t border-[#4A3024] md:grid-cols-2">

              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <article
                    key={reason.number}
                    className="group border-b border-[#4A3024] py-8 md:pr-8 md:odd:border-r md:odd:pr-10 md:even:pl-10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5A3B2C] text-[#C8A98D] transition-all duration-300 group-hover:border-[#A66A3F] group-hover:bg-[#A66A3F] group-hover:text-[#24150F]">
                        <Icon size={18} />
                      </div>

                      <span className="text-xs tracking-[0.2em] text-[#685247]">
                        {reason.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-medium text-[#F3E9DC]">
                      {reason.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-[#9D8373]">
                      {reason.description}
                    </p>
                  </article>
                );
              })}

            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex flex-col gap-4 border-y border-[#4A3024] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#8F786A]">
            Good coffee. Thoughtfully made. Delivered your way.
          </p>

          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#C8A98D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
            Brewed for everyday moments
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyBrewRush;

