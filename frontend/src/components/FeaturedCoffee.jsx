
import { ArrowUpRight, Star } from "lucide-react";

const coffees = [
  {
    name: "Velvet Latte",
    description:
      "Double espresso, silky steamed milk and a delicate layer of microfoam.",
    price: "$5.50",
    tag: "BrewRush Favorite",
    size: "large",
    tone: "light",
  },
  {
    name: "Cold Brew",
    description:
      "Slow-steeped for a naturally smooth, clean and refreshing finish.",
    price: "$4.90",
    tag: "Cold & Smooth",
    size: "small",
    tone: "dark",
  },
  {
    name: "Caramel Macchiato",
    description:
      "Rich espresso with velvety milk and a subtle caramel finish.",
    price: "$5.90",
    tag: "Signature",
    size: "small",
    tone: "warm",
  },
];

function CoffeeVisual({ tone }) {
  return (
    <div className="relative flex h-full min-h-[270px] items-center justify-center overflow-hidden">
      {/* Soft background shape */}
      <div
        className={`absolute h-52 w-52 rounded-full ${
          tone === "light"
            ? "bg-[#E7D4BC]"
            : tone === "warm"
              ? "bg-[#5A3828]"
              : "bg-[#24150F]"
        }`}
      />

      {/* Coffee cup */}
      <div className="relative z-10">
        <div
          className={`relative h-36 w-28 rounded-b-[2rem] rounded-t-xl shadow-2xl ${
            tone === "light"
              ? "bg-[#FAF7F2]"
              : tone === "warm"
                ? "bg-[#6B4226]"
                : "bg-[#3A2117]"
          }`}
        >
          {/* Coffee surface */}
          <div
            className={`absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full ${
              tone === "light" ? "bg-[#3A2117]" : "bg-[#160B07]"
            }`}
          />

          {/* Cup highlight */}
          <div className="absolute left-4 top-10 h-16 w-2 rounded-full bg-white/10" />

          {/* Handle */}
          <div
            className={`absolute -right-9 top-8 h-16 w-11 rounded-r-full border-[8px] ${
              tone === "light"
                ? "border-[#FAF7F2]"
                : tone === "warm"
                  ? "border-[#6B4226]"
                  : "border-[#3A2117]"
            }`}
          />

          {/* BrewRush mark */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
            <span
              className={`text-[7px] font-semibold tracking-[0.2em] ${
                tone === "light" ? "text-[#6B4226]" : "text-[#E7D4BC]"
              }`}
            >
              BREWRUSH
            </span>
          </div>
        </div>

        {/* Saucer / shadow */}
        <div className="absolute -bottom-5 left-1/2 h-5 w-40 -translate-x-1/2 rounded-full bg-black/20 blur-md" />
      </div>

      {/* Decorative beans */}
      <div className="absolute left-[18%] top-[22%] h-5 w-3 rotate-[-25deg] rounded-full bg-[#3A2117]" />
      <div className="absolute right-[20%] bottom-[22%] h-5 w-3 rotate-[35deg] rounded-full bg-[#24150F]" />
    </div>
  );
}

function FeaturedCoffee() {
  return (
    <section
      id="menu"
      className="bg-[#FAF7F2] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806A5A]">
                The BrewRush selection
              </p>
            </div>

            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              A few favourites,
              <br />
              <span className="font-serif italic text-[#6B4226]">
                made beautifully.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#806A5A]">
              From smooth morning lattes to slow-steeped cold brews,
              discover the drinks our coffee lovers keep coming back for.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 border-b border-[#BFA997] pb-2 text-sm font-medium text-[#5A3828] transition-colors hover:border-[#6B4226] hover:text-[#6B4226]">
            View full menu
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>

        {/* Coffee showcase */}
        <div className="grid gap-5 lg:grid-cols-12">

          {/* Main coffee */}
          <article className="group relative overflow-hidden rounded-[2rem] border border-[#DCCBBC] bg-[#E7D4BC] lg:col-span-6">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

            <div className="relative">
              <CoffeeVisual tone="light" />

              <div className="absolute left-6 top-6 rounded-full border border-[#BFA997] bg-[#FAF7F2]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B4226] backdrop-blur-md">
                {coffees[0].tag}
              </div>

              <button
                aria-label={`View ${coffees[0].name}`}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F2] text-[#24150F] shadow-sm transition-all duration-300 hover:bg-[#24150F] hover:text-white"
              >
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="border-t border-[#CDB8A3] bg-[#F3E9DC] p-7">
              <div className="flex items-center gap-1 text-[#A66A3F]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className="fill-current"
                  />
                ))}

                <span className="ml-2 text-xs text-[#806A5A]">
                  Customer favourite
                </span>
              </div>

              <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#24150F]">
                    {coffees[0].name}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#806A5A]">
                    {coffees[0].description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-lg font-semibold text-[#3A2117]">
                    {coffees[0].price}
                  </span>

                  <button className="rounded-full bg-[#24150F] px-5 py-2.5 text-xs font-semibold text-[#F3E9DC] transition-colors hover:bg-[#6B4226]">
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Smaller coffees */}
          <div className="grid gap-5 lg:col-span-6 sm:grid-cols-2 lg:grid-cols-1">

            {coffees.slice(1).map((coffee) => (
              <article
                key={coffee.name}
                className={`group grid overflow-hidden rounded-[2rem] border border-[#DCCBBC] ${
                  coffee.tone === "dark"
                    ? "bg-[#3A2117]"
                    : "bg-[#E7D4BC]"
                } sm:grid-cols-2`}
              >
                <div className="relative min-h-[250px]">
                  <CoffeeVisual tone={coffee.tone} />

                  <span
                    className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      coffee.tone === "dark"
                        ? "bg-white/10 text-[#E7D4BC]"
                        : "bg-[#FAF7F2]/70 text-[#6B4226]"
                    }`}
                  >
                    {coffee.tag}
                  </span>
                </div>

                <div
                  className={`flex flex-col justify-between p-6 ${
                    coffee.tone === "dark"
                      ? "text-[#F3E9DC]"
                      : "text-[#24150F]"
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {coffee.name}
                    </h3>

                    <p
                      className={`mt-3 text-sm leading-6 ${
                        coffee.tone === "dark"
                          ? "text-[#CDB8A3]"
                          : "text-[#806A5A]"
                      }`}
                    >
                      {coffee.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold">
                      {coffee.price}
                    </span>

                    <button
                      className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                        coffee.tone === "dark"
                          ? "bg-[#F3E9DC] text-[#24150F] hover:bg-white"
                          : "bg-[#24150F] text-[#F3E9DC] hover:bg-[#6B4226]"
                      }`}
                    >
                      Add to order
                    </button>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#DCCBBC] pt-6 text-xs text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">
          <span>Small-batch coffee. Thoughtfully prepared.</span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
            Freshly made to order
          </span>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCoffee;
