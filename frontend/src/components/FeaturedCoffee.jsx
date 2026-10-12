import { ArrowUpRight, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, formatPrice } from "../context/CartContext";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/products`;
const featuredSettings = [
  {
    preferredName: "Velvet Latte",
    imageSrc: "/images/velvet-latte.jpg",
    tag: "BrewRush Selection",
    tone: "light",
  },
  {
    preferredName: "Cold Brew",
    imageSrc: "/images/cold-brew.jpg",
    tag: "Cold & Smooth",
    tone: "dark",
  },
  {
    preferredName: "Caramel Macchiato",
    imageSrc: "/images/caramel-macchiato.jpg",
    tag: "Signature Coffee",
    tone: "warm",
  },
];

function CoffeeVisual({ tone, imageSrc, alt }) {
  const [imageFailed, setImageFailed] = useState(false);

  const toneStyles = {
    light: {
      background: "bg-[#E7D4BC]",
      cup: "bg-[#FAF7F2]",
      coffee: "bg-[#3A2117]",
      handle: "border-[#FAF7F2]",
      brand: "text-[#6B4226]",
    },
    warm: {
      background: "bg-[#5A3828]",
      cup: "bg-[#6B4226]",
      coffee: "bg-[#160B07]",
      handle: "border-[#6B4226]",
      brand: "text-[#F3E9DC]",
    },
    dark: {
      background: "bg-[#24150F]",
      cup: "bg-[#3A2117]",
      coffee: "bg-[#160B07]",
      handle: "border-[#3A2117]",
      brand: "text-[#E7D4BC]",
    },
  };

  const style = toneStyles[tone] || toneStyles.light;

  return (
    <div className="group relative flex h-full min-h-[270px] items-center justify-center overflow-hidden">
      {!imageFailed ? (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${style.background}`}
        >
          <div
            className={`relative h-36 w-28 rounded-b-[2rem] rounded-t-xl shadow-2xl ${style.cup}`}
          >
            <div
              className={`absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full ${style.coffee}`}
            />

            <div className="absolute left-4 top-10 h-16 w-2 rounded-full bg-white/20" />

            <div
              className={`absolute -right-9 top-8 h-16 w-11 rounded-r-full border-[8px] ${style.handle}`}
            />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
              <span
                className={`text-[7px] font-semibold tracking-[0.2em] ${style.brand}`}
              >
                BREWRUSH
              </span>
            </div>
          </div>
        </div>
      )}

      {!imageFailed && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#24150F]/35 via-transparent to-[#24150F]/10" />
      )}
    </div>
  );
}

function FeaturedCoffee() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Product request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid product list returned by the backend.");
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
          .map((product) => ({
            ...product,
            id: product.id ?? product._id ?? product.name,
            name: (product.name || "Coffee").trim(),
            description:
              product.description || "Freshly prepared coffee.",
            price: Number(product.price) || 0,
          }));

        if (!controller.signal.aborted) {
          setProducts(formattedProducts);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Featured coffee loading error:", err);

          if (!controller.signal.aborted) {
            setError(
              "Unable to load featured coffees. Please check your backend connection and try again."
            );
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Match each featured card to the correct product and local photo.
  const coffees = featuredSettings
    .map((setting) => {
      const product = products.find(
        (item) =>
          item.name.toLowerCase() === setting.preferredName.toLowerCase()
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        imageSrc: setting.imageSrc,
        tag: setting.tag,
        tone: setting.tone,
      };
    })
    .filter(Boolean);

  const handleAddToCart = (coffee) => {
    try {
      addToCart(coffee);
    } catch (err) {
      console.error("Unable to add featured coffee to cart:", err);
    }
  };

  const scrollToMenu = () => {
    document.getElementById("full-menu")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="menu"
      className="bg-[#FAF7F2] px-6 py-24 text-[#24150F] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
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
              From smooth morning coffees to refreshing cold brews,
              discover drinks for your everyday coffee moments.
            </p>
          </div>

          <a
            href="#full-menu"
            className="group flex w-fit items-center gap-2 border-b border-[#BFA997] pb-2 text-sm font-medium text-[#5A3828] transition-colors hover:border-[#6B4226] hover:text-[#6B4226]"
          >
            View full menu

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Loading state */}
        {loading ? (
          <p className="py-16 text-center text-sm text-[#806A5A]">
            Loading featured coffees...
          </p>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-800">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#24150F] px-5 py-3 text-xs font-semibold text-[#F3E9DC] transition-colors hover:bg-[#6B4226]"
            >
              Try again
            </button>
          </div>
        ) : coffees.length === 0 ? (
          <p className="py-16 text-center text-sm text-[#806A5A]">
            No featured coffees are currently available.
          </p>
        ) : (
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Main featured coffee */}
            {coffees[0] && (
              <article className="group relative overflow-hidden rounded-[2rem] border border-[#DCCBBC] bg-[#E7D4BC] lg:col-span-6">
                <div className="relative">
                  <CoffeeVisual
                    tone={coffees[0].tone}
                    imageSrc={coffees[0].imageSrc}
                    alt={coffees[0].name}
                  />

                  <div className="absolute left-6 top-6 rounded-full border border-[#BFA997] bg-[#FAF7F2]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B4226] backdrop-blur-md">
                    {coffees[0].tag}
                  </div>

                  <button
                    type="button"
                    aria-label={`View ${coffees[0].name} in full menu`}
                    onClick={scrollToMenu}
                    className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F2] text-[#24150F] shadow-sm transition-all duration-300 hover:bg-[#24150F] hover:text-white"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                <div className="border-t border-[#CDB8A3] bg-[#F3E9DC] p-7">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#806A5A]">
                    <Coffee size={14} className="text-[#A66A3F]" />
                    <span>Freshly prepared</span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-[#24150F]">
                      {coffees[0].name}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-[#806A5A]">
                      {coffees[0].description}
                    </p>

                    <div className="mt-6 flex w-full items-center justify-between gap-4">
                      <span className="whitespace-nowrap text-lg font-semibold text-[#3A2117]">
                        {formatPrice(coffees[0].price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(coffees[0])}
                        className="shrink-0 rounded-full bg-[#24150F] px-5 py-3 text-xs font-semibold text-[#F3E9DC] transition-colors hover:bg-[#6B4226] active:scale-[0.98]"
                      >
                        Add to order
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Smaller featured coffees */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1">
              {coffees.slice(1).map((coffee) => (
                <article
                  key={coffee.id}
                  className={`group grid overflow-hidden rounded-[2rem] border border-[#DCCBBC] ${
                    coffee.tone === "dark"
                      ? "bg-[#3A2117]"
                      : "bg-[#E7D4BC]"
                  } sm:grid-cols-2`}
                >
                  <div className="relative min-h-[250px]">
                    <CoffeeVisual
                      tone={coffee.tone}
                      imageSrc={coffee.imageSrc}
                      alt={coffee.name}
                    />

                    <span
                      className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        coffee.tone === "dark"
                          ? "bg-[#24150F]/80 text-[#F3E9DC]"
                          : "bg-[#FAF7F2]/90 text-[#6B4226]"
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
                        {formatPrice(coffee.price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(coffee)}
                        className={`shrink-0 rounded-full px-4 py-3 text-xs font-semibold transition-colors active:scale-[0.98] ${
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
        )}

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