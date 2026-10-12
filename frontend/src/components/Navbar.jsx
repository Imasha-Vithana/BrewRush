import { useState } from "react";
import {
  Coffee,
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

function Navbar({ searchQuery = "", setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();
  const { cartCount } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeMenu();
    setSearchOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToTrackOrder = () => {
    closeMenu();
    navigate("/track-order");
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      scrollToSection("full-menu");
    }

    if (event.key === "Escape") {
      setSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setSearchOpen((previous) => !previous);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
    setSearchOpen(false);
  };

  const navLinkClass =
    "text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]";

  const mobileLinkClass =
    "rounded-xl px-4 py-3 text-left text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]";

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C7B5] bg-[#F3E9DC]/95 text-[#24150F] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={closeMenu}
            aria-label="BrewRush home"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC] transition-transform duration-300 group-hover:rotate-[-8deg]">
              <Coffee size={19} />
            </div>

            <div>
              <span className="block text-lg font-semibold tracking-[-0.02em] text-[#24150F]">
                BrewRush
              </span>

              <span className="hidden text-[9px] font-medium uppercase tracking-[0.25em] text-[#806A5A] sm:block">
                Specialty Coffee
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 md:flex lg:gap-7"
          >
            <a href="/#home" className={navLinkClass}>
              Home
            </a>

            <a href="/#menu" className={navLinkClass}>
              Featured
            </a>

            <a href="/#full-menu" className={navLinkClass}>
              Menu
            </a>

            <a href="/#about" className={navLinkClass}>
              Our Story
            </a>

            <a href="/#reviews" className={navLinkClass}>
              Reviews
            </a>

            <button
              type="button"
              onClick={goToTrackOrder}
              className={navLinkClass}
            >
              Track Order
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              type="button"
              onClick={toggleSearch}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
            >
              <ShoppingBag size={18} />

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A66A3F] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            {/* Desktop Order Now */}
            <button
              type="button"
              onClick={() => scrollToSection("full-menu")}
              className="group hidden items-center gap-2 rounded-full bg-[#24150F] px-4 py-2.5 text-xs font-semibold text-[#F3E9DC] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6B4226] hover:shadow-md md:inline-flex lg:px-5"
            >
              Order Now

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-colors hover:bg-[#E8D8C5] md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div className="border-t border-[#D8C7B5] py-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#806A5A]"
              />

              <input
                type="search"
                placeholder="Search your coffee..."
                autoFocus
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery?.(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
                aria-label="Search coffee menu"
                className="w-full rounded-full border border-[#D8C7B5] bg-[#FAF7F2] py-3 pl-11 pr-4 text-sm text-[#24150F] outline-none placeholder:text-[#806A5A] focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
              />

              <p className="mt-2 pl-4 text-xs text-[#806A5A]">
                Type a coffee name and press Enter to view the menu.
              </p>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-[#D8C7B5] py-5 md:hidden">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className={mobileLinkClass}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("menu")}
                className={mobileLinkClass}
              >
                Featured Coffee
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("full-menu")}
                className={mobileLinkClass}
              >
                Full Menu
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className={mobileLinkClass}
              >
                Our Story
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("reviews")}
                className={mobileLinkClass}
              >
                Customer Reviews
              </button>

              <button
                type="button"
                onClick={goToTrackOrder}
                className={mobileLinkClass}
              >
                Track Order
              </button>

              {/* Mobile Order Now */}
              <button
                type="button"
                onClick={() => scrollToSection("full-menu")}
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#24150F] px-5 py-3.5 text-sm font-semibold text-[#F3E9DC] transition-colors hover:bg-[#6B4226]"
              >
                Order Now

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Shopping Cart Drawer */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </header>
  );
}

export default Navbar;