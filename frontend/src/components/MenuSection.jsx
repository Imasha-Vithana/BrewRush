import { Search, SlidersHorizontal, Plus, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/products`;
const categories = ["All", "Hot Coffee", "Cold Coffee", "Blended"];

// Local coffee images inside frontend/public/images/
const LOCAL_COFFEE_IMAGES = {
  cappuccino: "/images/cappuccino.jpg",
  "caramel macchiato": "/images/caramel-macchiato.jpg",
  "cold brew": "/images/cold-brew.jpg",
  "iced mocha": "/images/iced-mocha.jpg",
  "velvet latte": "/images/velvet-latte.jpg",
};

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
            const productName = (product.name || "Coffee").trim();
            const normalizedName = productName.toLowerCase();

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

            return {
              ...product,
              id: product.id ?? product._id ?? product.name,
              name: productName,
              description:
                product.description || "Freshly prepared coffee.",
              price: Number(product.price) || 0,
              category,
              tag: product.tag || "Fresh",
              imageSrc: LOCAL_COFFEE_IMAGES[normalizedName] || "",
            };
          });

        setMenuItems(formattedProducts);
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

  const handleAddToCart = (item) => {
    if (typeof addToCart !== "function") {
      console.error("Cart error: addToCart is not available.");
      return;
    }

    try {
      addToCart(item);
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
        {/* Menu heading and search */}
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

        {/* Category filters */}
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

        {/* Loading state */}
        {loading ? (
          <p className="mt-10 py-16 text-center text-sm text-[#806A5A]">
            Loading coffees...
          </p>
        ) : error ? (
          /* Error state */
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
            {/* Results count */}
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

            {/* Coffee cards */}
            <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id || item._id || item.name}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#D8C7B5] bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA997] hover:shadow-xl"
                >
                  {/* Real coffee photo only — no illustrated cup overlay */}
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden bg-[#E8D8C5]">
                      {item.imageSrc ? (
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";

                            const fallback =
                              event.currentTarget.parentElement?.querySelector(
                                "[data-image-fallback]"
                              );

                            fallback?.classList.remove("hidden");
                          }}
                        />
                      ) : null}

                      {/* Fallback if the local photo is missing */}
                      <div
                        data-image-fallback
                        className={`${
                          item.imageSrc ? "hidden" : ""
                        } absolute inset-0 flex items-center justify-center bg-[#E8D8C5] px-6 text-center`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#806A5A]">
                          {item.name}
                        </span>
                      </div>
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

                  {/* Coffee details */}
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

            {/* No results */}
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

        {/* Menu footer */}
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