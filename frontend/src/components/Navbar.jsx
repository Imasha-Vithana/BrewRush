import { useState } from "react";
import {Coffee,Search,ShoppingBag,Menu,UserRound,X,} from "lucide-react";
import { useCart } from "../context/CartContext";
import Cart from "./Cart"

function Navbar({ searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen]= useState(false);

  const { cartCount } = useCart();
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C7B5] bg-[#F3E9DC]/95 text-[#24150F] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">

          {/* Logo */}
          <a href="#home" onClick={closeMenu} className="flex items-center gap-3">
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
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]">
              Home
            </a>

            <a
              href="#menu"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]" >
              Featured
            </a>

            <a
              href="#full-menu"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]">
              Menu
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-[#5A3828] transition-colors hover:text-[#A66A3F]">
              Our Story
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search */}
            <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
            aria-label="Search">
            <Search size={18} />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] hover:text-[#A66A3F]"
              aria-label="Shopping bag">
              <ShoppingBag size={18} />

              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A66A3F] text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            {/* Login */}
            <button className="hidden items-center gap-2 rounded-full bg-[#24150F] px-5 py-2.5 text-xs font-semibold text-[#F3E9DC] transition-all hover:bg-[#6B4226] sm:flex">
              <UserRound size={15} />
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A3828] transition-all hover:bg-[#E8D8C5] md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}>
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#806A5A]"/>

                <input
                  type="text"
                  placeholder="Search coffee..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      document.getElementById("full-menu")?.scrollIntoView({
                        behavior: "smooth",
                      });
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
                href="#home"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]">
                Home
              </a>

              <a
                href="#menu"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]">
                Featured Coffee
              </a>

              <a
                href="#full-menu"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]">
                Full Menu
              </a>

              <a
                href="#about"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#5A3828] transition-colors hover:bg-[#E8D8C5] hover:text-[#24150F]">
                Our Story
              </a>

            </nav>
          </div>
        )}
      </div>

        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
        />

    </header>
    
  );
}

export default Navbar;