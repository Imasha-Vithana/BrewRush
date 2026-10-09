import { Coffee, Mail, Phone } from "lucide-react";
import {FaInstagram,FaFacebookF,FaTwitter,} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#24150F] px-6 py-14 text-[#F3E9DC] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9DC] text-[#24150F]">
                <Coffee size={19} />
              </div>

              <div>
                <span className="block text-xl font-semibold tracking-tight">
                  BrewRush
                </span>

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8F786A]">
                  Specialty Coffee
                </span>
              </div>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#9D8373]">
              Carefully crafted coffee, thoughtfully delivered. Making your
              everyday coffee moments a little better, one cup at a time.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">

              <button
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A3024] text-[#9D8373] transition-all hover:border-[#A66A3F] hover:bg-[#A66A3F] hover:text-[#24150F]"
              >
                <FaInstagram size={15} />
              </button>

              <button
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A3024] text-[#9D8373] transition-all hover:border-[#A66A3F] hover:bg-[#A66A3F] hover:text-[#24150F]"
              >
                <FaFacebookF size={14} />
              </button>

              <button
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A3024] text-[#9D8373] transition-all hover:border-[#A66A3F] hover:bg-[#A66A3F] hover:text-[#24150F]"
              >
                <FaTwitter size={14} />
              </button>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-[#F3E9DC]">
              Explore
            </h3>

            <nav className="mt-5 space-y-3 text-sm text-[#8F786A]">
              <a
                href="#home"
                className="block transition-colors hover:text-[#C8A98D]"
              >
                Home
              </a>

              <a
                href="#menu"
                className="block transition-colors hover:text-[#C8A98D]"
              >
                Featured Coffee
              </a>

              <a
                href="#full-menu"
                className="block transition-colors hover:text-[#C8A98D]"
              >
                Full Menu
              </a>

              <a
                href="#about"
                className="block transition-colors hover:text-[#C8A98D]"
              >
                Our Story
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#F3E9DC]">
              Get in touch
            </h3>

            <div className="mt-5 space-y-4 text-sm text-[#8F786A]">

              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#A66A3F]" />
                <span>brewrush@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#A66A3F]" />
                <span>+94 77 123 4567</span>
              </div>

              <p className="pt-1 leading-6">
                Fresh coffee delivered
                <br />
                with care.
              </p>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#4A3024] pt-6 text-xs text-[#685247] sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 BrewRush. All rights reserved.
          </p>

          <div className="flex gap-5">
            <span className="hover:text-[#9D8373]">
              Privacy Policy
            </span>

            <span className="hover:text-[#9D8373]">
              Terms
            </span>

            <span className="text-[#8F786A]">
              Crafted for coffee lovers.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;

