import { Search, SlidersHorizontal, Plus, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const menuItems = [
  {
    name: "Velvet Latte",
    category: "Hot Coffee",
    description: "Double espresso with silky steamed milk and soft microfoam.",
    price: 5.5,
    tag: "Popular",
    tone: "latte",
  },
  {
    name: "Classic Cappuccino",
    category: "Hot Coffee",
    description: "Rich espresso balanced with creamy milk foam.",
    price: 5.2,
    tag: "Classic",
    tone: "cream",
  },
  {
    name: "Caramel Macchiato",
    category: "Hot Coffee",
    description: "Espresso, velvety milk and a delicate caramel finish.",
    price: 5.9,
    tag: "Signature",
    tone: "caramel",
  },
  {
    name: "Cold Brew",
    category: "Cold Coffee",
    description: "Slow-steeped coffee with a naturally smooth finish.",
    price: 4.9,
    tag: "Refreshing",
    tone: "dark",
  },
  {
    name: "Iced Mocha",
    category: "Cold Coffee",
    description: "Chilled espresso blended with chocolate and fresh milk.",
    price: 5.7,
    tag: "Chocolate",
    tone: "mocha",
  },
  {
    name: "Vanilla Frappe",
    category: "Blended",
    description: "Creamy blended coffee with smooth vanilla notes.",
    price: 6.2,
    tag: "Creamy",
    tone: "vanilla",
  },
];

const categories = ["All", "Hot Coffee", "Cold Coffee", "Blended"];

function CoffeeImage({ tone }) {
  const cupColors = {
    latte: "bg-[#FAF7F2]",
    cream: "bg-[#E7D4BC]",
    caramel: "bg-[#A66A3F]",
    dark: "bg-[#3A2117]",
    mocha: "bg-[#6B4226]",
    vanilla: "bg-[#F0E1CE]",
  };

  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#E8D8C5]">
      <div className="absolute h-44 w-44 rounded-full bg-[#D2B79B]" />

      <div
        className={`relative z-10 h-32 w-24 rounded-b-[1.8rem] rounded-t-lg shadow-xl ${cupColors[tone]}`}
      >
        <div className="absolute left-1/2 top-2 h-4 w-[4.5rem] -translate-x-1/2 rounded-full bg-[#24150F]" />

        <div className="absolute left-4 top-9 h-12 w-1.5 rounded-full bg-white/20" />

        <div
          className={`absolute -right-7 top-7 h-14 w-10 rounded-r-full border-[7px] ${cupColors[tone]}`}
        />

        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[6px] font-bold tracking-[0.18em] text-[#6B4226]">
          BREWRUSH
        </span>
      </div>

      <div className="absolute bottom-10 h-5 w-36 rounded-full bg-[#24150F]/20 blur-md" />

      <span className="absolute left-8 top-10 h-5 w-3 rotate-[-25deg] rounded-full bg-[#3A2117]" />
      <span className="absolute bottom-9 right-10 h-5 w-3 rotate-[30deg] rounded-full bg-[#24150F]" />
    </div>
  );
}

function MenuSection({ searchQuery = "", setSearchQuery }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    if (typeof addToCart !== "function") {
      console.error("Cart error: addToCart is not available.");
      return;
    }

    addToCart(item);
    console.log("Added to cart:", item.name);
  };

  const clearFilters = () => {
    setActiveCategory("All");
    setSearchQuery?.("");
  };

  return (
    <section
      id="full-menu"
      className="bg-[#F3E9DC] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A66A3F]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806A5A]">
                Our menu
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Find something
              <br />
              <span className="font-serif italic text-[#6B4226]">
                worth sipping.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#806A5A]">
              Explore our handcrafted coffee selection. Search by drink or
              browse through our different coffee styles.
            </p>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#806A5A]"
              />

              <input
                type="text"
                placeholder="Search your coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className="w-full rounded-full border border-[#CDB8A3] bg-[#FAF7F2] py-3.5 pl-11 pr-5 text-sm text-[#24150F] outline-none transition-all placeholder:text-[#9D8979] focus:border-[#6B4226] focus:ring-2 focus:ring-[#A66A3F]/10"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-[#D8C7B5] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-[#806A5A]">
            <SlidersHorizontal size={16} />
            <span>Browse by category</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-[#24150F] text-[#F3E9DC]"
                    : "border border-[#CDB8A3] bg-[#FAF7F2] text-[#6B4226] hover:border-[#6B4226]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-[#806A5A]">
            Showing{" "}
            <span className="font-semibold text-[#3A2117]">
              {filteredItems.length}
            </span>{" "}
            coffees
          </p>

          <p className="hidden text-xs uppercase tracking-[0.15em] text-[#9D8979] sm:block">
            Prepared fresh
          </p>
        </div>

        <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-[1.75rem] border border-[#D8C7B5] bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA997] hover:shadow-xl"
            >
              <div className="relative">
                <CoffeeImage tone={item.tone} />

                <span className="absolute left-5 top-5 rounded-full bg-[#FAF7F2]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B4226] backdrop-blur-md">
                  {item.tag}
                </span>

                <button
                  type="button"
                  aria-label={`View ${item.name}`}
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2]/90 text-[#3A2117] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#24150F] hover:text-white"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A66A3F]">
                      {item.category}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#24150F]">
                      {item.name}
                    </h3>
                  </div>

                  <span className="text-lg font-semibold text-[#3A2117]">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#806A5A]">
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#24150F] py-3 text-xs font-semibold text-[#F3E9DC] transition-all hover:bg-[#6B4226] active:scale-[0.98]"
                >
                  <Plus size={16} />
                  Add to order
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7D4BC] text-[#6B4226]">
              <Search size={21} />
            </div>

            <p className="mt-5 text-lg font-semibold text-[#3A2117]">
              No coffee found
            </p>

            <p className="mt-2 text-sm text-[#806A5A]">
              Try another coffee name or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-semibold text-[#6B4226] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-14 border-t border-[#D8C7B5] pt-6">
          <div className="flex flex-col gap-3 text-xs text-[#806A5A] sm:flex-row sm:items-center sm:justify-between">
            <span>
              All coffees are prepared fresh when your order is placed.
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A66A3F]" />
              Freshly prepared
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;