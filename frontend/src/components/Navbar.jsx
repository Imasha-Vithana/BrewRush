import { useState } from "react";
import {
  Coffee,
  Search,
  ShoppingBag,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

function Navbar({ searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();
  const { cartCount } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToAdminLogin = () => {
    closeMenu();
    navigate("/admin/login");
  };

  const scrollToSection = (sectionId) => {
    closeMenu();

    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C7B5] bg-[#F3E9DC]/95 text-[#24150F] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24150F] text-[#F3E9DC]">
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
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            <a
              href="/"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]"
            >
              Home
            </a>

            <a
              href="/#menu"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]"
            >
              Featured
            </a>

            <a
              href="/#full-menu"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]"
            >
              Menu
            </a>

            <a
              href="/#about"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]"
            >
              Our Story
            </a>

            <a
              href="/track-order"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]"
            >
              Track Order
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search size={18} />
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={18} />

              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A66A3F] text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            {/* Desktop Login */}
            <button
              type="button"
              onClick={goToAdminLogin}
              className="hidden items-center gap-2 rounded-full bg-[#24150F] px-5 py-2.5 text-xs font-semibold text-[#F3E9DC] transition-all hover:bg-[#6B4226] sm:flex"
            >
              <UserRound size={15} />
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] md:hidden"
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
                type="text"
                placeholder="Search coffee..."
                autoFocus
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSearchOpen(false);
                    scrollToSection("full-menu");
                  }
                }}
                className="w-full rounded-full border border-[#D8C7B5] bg-[#FAF7F2] py-3 pl-11 pr-4 text-sm text-[#24150F] outline-none placeholder:text-[#806A5A] focus:border-[#A66A3F]"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-[#D8C7B5] py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              <a
                href="/"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]"
              >
                Home
              </a>

              <button
                type="button"
                onClick={() => scrollToSection("menu")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]"
              >
                Featured Coffee
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("full-menu")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]"
              >
                Full Menu
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]"
              >
                Our Story
              </button>

              <a
                href="/track-order"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]"
              >
                Track Order
              </a>

              {/* Mobile Login */}
              <button
                type="button"
                onClick={goToAdminLogin}
                className="mt-2 flex items-center gap-2 rounded-xl bg-[#24150F] px-4 py-3 text-left text-sm font-semibold text-[#F3E9DC] transition-colors hover:bg-[#6B4226]"
              >
                <UserRound size={16} />
                Admin Login
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