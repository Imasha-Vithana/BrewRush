
import { Search, SlidersHorizontal, Plus, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:8080/api/products";

const categories = ["All", "Hot Coffee", "Cold Coffee", "Blended"];

function CoffeeImage({ tone = "cream" }) {
  const cupColors = {
    latte: "bg-[#FAF7F2]",
    cream: "bg-[#E7D4BC]",
    caramel: "bg-[#A66A3F]",
    dark: "bg-[#3A2117]",
    mocha: "bg-[#6B4226]",
    vanilla: "bg-[#F0E1CE]",
  };

  const cupColor = cupColors[tone] || cupColors.cream;

  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#E8D8C5]">
      <div className="absolute h-44 w-44 rounded-full bg-[#D2B79B]" />

      <div
        className={`relative z-10 h-32 w-24 rounded-b-[1.8rem] rounded-t-lg shadow-xl ${cupColor}`}
      >
        <div className="absolute left-1/2 top-2 h-4 w-[4.5rem] -translate-x-1/2 rounded-full bg-[#24150F]" />
        <div className="absolute left-4 top-9 h-12 w-1.5 rounded-full bg-white/20" />

        <div
          className={`absolute -right-7 top-7 h-14 w-10 rounded-r-full border-[7px] ${cupColor}`}
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
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The products API did not return a list.");
        }

        const seenNames = new Set();

        const formattedProducts = data
          .filter((product) => product.available !== false)
          .filter((product) => {
            const name = (product.name || "Coffee").trim().toLowerCase();

            if (seenNames.has(name)) {
              return false;
            }

            seenNames.add(name);
            return true;
          })
          .map((product) => {
            const categoryName = (
              product.category || "Hot Coffee"
            ).toLowerCase();

            let category = "Hot Coffee";

            if (
              categoryName.includes("cold") ||
              categoryName.includes("iced")
            ) {
              category = "Cold Coffee";
            } else if (
              categoryName.includes("blend") ||
              categoryName.includes("frappe")
            ) {
              category = "Blended";
            }

            const tones = {
              "Cold Coffee": "dark",
              Blended: "vanilla",
              "Hot Coffee": "cream",
            };

            return {
              ...product,
              id: product.id ?? product._id ?? product.name,
              name: product.name || "Coffee",
              description:
                product.description || "Freshly prepared coffee.",
              price: Number(product.price) || 0,
              category,
              tag: product.tag || "Fresh",
              tone: product.tone || tones[category],
            };
          });

        setMenuItems(formattedProducts);
        console.log("Products loaded:", formattedProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Product loading error:", err);
          setError(
            "Unable to load coffees. Please check your backend connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

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

  // Debugging: check why Add to Cart may not be working.
  const handleAddToCart = (item) => {
    console.log("Add to cart clicked:", item);
    console.log("addToCart function:", addToCart);

    if (typeof addToCart !== "function") {
      console.error("Cart error: addToCart is not available.");
      return;
    }

    try {
      addToCart(item);
      console.log("Add to cart function called successfully.");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
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

        {loading ? (
          <p className="mt-10 py-16 text-center text-sm text-[#806A5A]">
            Loading coffees...
          </p>
        ) : error ? (
          <div className="mt-10 py-16 text-center">
            <p className="text-sm text-red-800">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#24150F] px-5 py-3 text-xs font-semibold text-[#F3E9DC]"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
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
                  key={item.id || item._id || item.name}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#D8C7B5] bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA997] hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="relative">
                      <CoffeeImage tone={item.tone} />

                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </div>

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

                      <span className="whitespace-nowrap text-lg font-semibold text-[#3A2117]">
                        LKR{" "}
                        {item.price.toLocaleString("en-LK", {
                          maximumFractionDigits: 2,
                        })}
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
          </>
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
