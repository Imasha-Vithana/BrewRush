import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Kasun Silva",
    role: "Espresso Enthusiast",
    review:
      "Hands down the best Espresso in town. Rich crema, bold flavor & super fast delivery. My morning essential!",
  },
  {
    name: "Meuri Perera",
    role: "Coffee Lover",
    review:
      "Smooth, non-acidic & incredibly refreshing. The Cold Brew bottle design looks sleek too. 10/10 recommendation!",
  },
  {
    name: "Sophie Williams",
    role: "Daily Customer",
    review:
      "The Caramel Iced Latte is perfectly balanced - not too sweet, just the coffee kick. BrewRush never disappoints!",
  },
  {
    name: "Nimesh Fernando",
    role: "Software Engineer",
    review:
        "As a developer, good coffee keeps me going. smooth ordering and the Cappuccino arrives piping hot every time.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-[#A66A3F]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className="fill-current"
        />
      ))}
    </div>
  );
}

function Reviews() {
  return (
    <section className="bg-[#F3E9DC] px-6 py-24 text-[#24150F] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806A5A]">
                Loved by coffee people
              </p>
            </div>

            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Good coffee gets
              <br />
              <span className="font-serif italic text-[#6B4226]">
                people talking.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Stars />

                <span className="text-sm font-semibold text-[#3A2117]">
                  4.9 / 5
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#806A5A]">
                Trusted by coffee lovers who want a better cup without
                making their day more complicated.
              </p>
            </div>
          </div>
        </div>

        {/* Featured review */}
        <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#24150F] text-[#F3E9DC]">

          <div className="grid lg:grid-cols-12">

            {/* Quote */}
            <div className="relative p-8 sm:p-10 lg:col-span-8 lg:p-14">

              <Quote
                size={46}
                strokeWidth={1.2}
                className="text-[#A66A3F]"
              />

              <p className="mt-8 max-w-3xl text-2xl font-medium leading-[1.35] tracking-tight sm:text-3xl lg:text-4xl">
                “{reviews[0].review}”
              </p>

              <div className="mt-10 flex items-center gap-4 border-t border-[#4A3024] pt-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6B4226] text-sm font-semibold text-[#F3E9DC]">
                  MF
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {reviews[0].name}
                  </p>

                  <p className="mt-1 text-xs text-[#9D8373]">
                    {reviews[0].role}
                  </p>
                </div>

                <div className="ml-auto hidden sm:block">
                  <Stars />
                </div>
              </div>
            </div>

            {/* Rating panel */}
            <div className="flex min-h-[250px] flex-col justify-between border-t border-[#4A3024] bg-[#3A2117] p-8 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B99B84]">
                  Customer rating
                </p>

                <p className="mt-4 text-6xl font-semibold tracking-tight text-[#F3E9DC]">
                  4.9
                </p>

                <div className="mt-3">
                  <Stars />
                </div>
              </div>

              <p className="mt-8 text-sm leading-6 text-[#B9A294]">
                Quality coffee, thoughtful preparation, and an experience
                customers keep coming back to.
              </p>
            </div>
          </div>
        </div>

        {/* Smaller reviews */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {reviews.slice(1).map((review) => (
            <article
              key={review.name}
              className="group rounded-[1.75rem] border border-[#D8C7B5] bg-[#FAF7F2] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA997] hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <Stars />

                <Quote
                  size={22}
                  strokeWidth={1.3}
                  className="text-[#C5A98D]"
                />
              </div>

              <p className="mt-6 text-base leading-7 text-[#5A3828]">
                “{review.review}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-[#E2D5C8] pt-5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7D4BC] text-[10px] font-semibold text-[#6B4226]">
                  {review.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#3A2117]">
                    {review.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#806A5A]">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#D8C7B5] pt-6 text-xs text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">
          <span>
            Every cup has a story. These are a few of ours.
          </span>

          <span className="flex items-center gap-2 uppercase tracking-[0.15em] text-[#6B4226]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
            BrewRush community
          </span>
        </div>
      </div>
    </section>
  );
}

export default Reviews;

