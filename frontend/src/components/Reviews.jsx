import { Star, Quote, MessageCircle, Coffee } from "lucide-react";

const reviews = [
  {
    name: "Kasun Silva",
    role: "Espresso Enthusiast",
    review:
      "Hands down, one of my favourite espresso experiences. Rich flavour, smooth crema, and delivery that fits perfectly into my morning routine.",
  },
  {
    name: "Meuri Perera",
    role: "Coffee Lover",
    review:
      "The Cold Brew is smooth and refreshing. I love the simple ordering experience and the attention to detail in every order.",
  },
  {
    name: "Sophie Williams",
    role: "Daily Customer",
    review:
      "The Caramel Macchiato has a lovely balance of coffee and sweetness. BrewRush makes it easy to enjoy my favourite drink at home.",
  },
  {
    name: "Nimesh Fernando",
    role: "Software Engineer",
    review:
      "As a developer, good coffee is part of my daily routine. Ordering is simple, and the Cappuccino is a great companion during a busy day.",
  },
];

function Stars({ size = 14 }) {
  return (
    <div
      className="flex items-center gap-1 text-[#A66A3F]"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className="fill-current"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Reviews() {
  const featuredReview = reviews[0];

  return (
    <section
      id="reviews"
      className="overflow-hidden bg-[#F3E9DC] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806A5A]">
                Customer experiences
              </p>
            </div>

            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Good coffee gets
              <br />

              <span className="font-serif italic text-[#6B4226]">
                people talking.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#806A5A] sm:text-base">
              Every coffee moment is different. Discover what our sample
              customers love about the BrewRush experience.
            </p>
          </div>

          {/* Rating summary */}
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl border border-[#D8C7B5] bg-[#FAF7F2] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#3A2117]">
                    Made for coffee lovers
                  </p>

                  <p className="mt-1 text-xs text-[#806A5A]">
                    Great coffee, everyday moments
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-[#E2D5C8] pt-5">
                <Stars size={16} />

                <p className="mt-3 text-sm leading-6 text-[#806A5A]">
                  From your first morning sip to your afternoon coffee break,
                  every cup should feel worth the moment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured review */}
        <article className="mt-14 overflow-hidden rounded-[2rem] bg-[#24150F] text-[#F3E9DC] shadow-sm">
          <div className="grid lg:grid-cols-12">
            <div className="relative p-8 sm:p-10 lg:col-span-8 lg:p-14">
              <Quote
                size={42}
                strokeWidth={1.2}
                className="text-[#C49A6C]"
              />

              <p className="mt-7 max-w-3xl text-xl font-medium leading-relaxed tracking-tight sm:text-2xl lg:text-3xl">
                “{featuredReview.review}”
              </p>

              <div className="mt-9 flex items-center gap-4 border-t border-[#4A3024] pt-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#A66A3F]/50 bg-[#6B4226] text-sm font-semibold text-[#FAF7F2]">
                  {getInitials(featuredReview.name)}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {featuredReview.name}
                  </p>

                  <p className="mt-1 text-xs text-[#B9A294]">
                    {featuredReview.role}
                  </p>
                </div>

                <div className="ml-auto hidden sm:block">
                  <Stars />
                </div>
              </div>
            </div>

            {/* Featured review side panel */}
            <div className="flex flex-col justify-between border-t border-[#4A3024] bg-[#3A2117] p-8 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A98D]">
                  The BrewRush feeling
                </p>

                {/* Coffee brand badge */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#80604A] bg-[#4A3024]">
                    <Coffee
                      size={30}
                      strokeWidth={1.4}
                      className="text-[#C49A6C]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#FAF7F2]">
                      Made for your daily ritual
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#B9A294]">
                      Crafted with care
                    </p>
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-semibold leading-snug text-[#FAF7F2]">
                  Little moments.
                  <br />
                  Better coffee.
                </h3>
              </div>

              <p className="mt-8 text-sm leading-7 text-[#C5B2A3]">
                Carefully prepared drinks to make your everyday coffee
                moments feel a little more special.
              </p>
            </div>
          </div>
        </article>

        {/* Review cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(1).map((review) => (
            <article
              key={review.name}
              className="group flex flex-col rounded-[1.75rem] border border-[#D8C7B5] bg-[#FAF7F2] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA997] hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center justify-between">
                <Stars />

                <Quote
                  size={22}
                  strokeWidth={1.3}
                  className="text-[#C5A98D] transition-transform duration-300 group-hover:rotate-6"
                />
              </div>

              <p className="mt-6 flex-1 text-sm leading-7 text-[#5A3828] sm:text-base">
                “{review.review}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-[#E2D5C8] pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E7D4BC] text-xs font-semibold text-[#6B4226]">
                  {getInitials(review.name)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#3A2117]">
                    {review.name}
                  </p>

                  <p className="mt-1 text-xs text-[#806A5A]">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#D8C7B5] pt-6 text-xs text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">
          <span>Every cup has a story. These are a few of ours.</span>

          <span className="flex items-center gap-2 font-medium uppercase tracking-[0.15em] text-[#6B4226]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
            BrewRush community
          </span>
        </div>
      </div>
    </section>
  );
}

export default Reviews;