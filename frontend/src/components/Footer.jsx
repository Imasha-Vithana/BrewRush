import { Coffee, Mail, Phone, ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-[#24150F] px-6 py-14 text-[#F3E9DC] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Main footer */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <a
              href="#home"
              aria-label="BrewRush home"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E9DC] text-[#24150F] transition-transform duration-300 group-hover:rotate-[-8deg]">
                <Coffee size={21} />
              </div>

              <div>
                <span className="block text-xl font-semibold tracking-tight">
                  BrewRush
                </span>

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#A58A78]">
                  Specialty Coffee
                </span>
              </div>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#B9A294]">
              Carefully crafted coffee, thoughtfully delivered. Making your
              everyday coffee moments a little better, one cup at a time.
            </p>

            {/* Social links */}
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4A3024] text-[#B9A294] transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:bg-[#C49A6C] hover:text-[#24150F]"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4A3024] text-[#B9A294] transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:bg-[#C49A6C] hover:text-[#24150F]"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4A3024] text-[#B9A294] transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:bg-[#C49A6C] hover:text-[#24150F]"
              >
                <FaTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Explore navigation */}
          <div>
            <h3 className="text-sm font-semibold text-[#F3E9DC]">
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-5 space-y-4 text-sm text-[#B9A294]"
            >
              <a
                href="#home"
                className="group flex w-fit items-center gap-2 transition-colors hover:text-[#C8A98D]"
              >
                Home
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>

              <a
                href="#menu"
                className="group flex w-fit items-center gap-2 transition-colors hover:text-[#C8A98D]"
              >
                Featured Coffee
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>

              <a
                href="#full-menu"
                className="group flex w-fit items-center gap-2 transition-colors hover:text-[#C8A98D]"
              >
                Full Menu
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>

              <a
                href="#about"
                className="group flex w-fit items-center gap-2 transition-colors hover:text-[#C8A98D]"
              >
                Our Story
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>

              <a
                href="#reviews"
                className="group flex w-fit items-center gap-2 transition-colors hover:text-[#C8A98D]"
              >
                Customer Reviews
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>

              {/* Admin Portal moved to Explore */}
              <a
                href="/admin/login"
                aria-label="Open BrewRush Admin Portal"
                className="group flex w-fit items-center gap-2 pt-2 font-medium text-[#C8A98D] transition-colors hover:text-[#F3E9DC]"
              >
                Admin Portal
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#F3E9DC]">
              Get in touch
            </h3>

            <div className="mt-5 space-y-5 text-sm text-[#B9A294]">
              <a
                href="mailto:brewrush@gmail.com"
                className="group flex items-start gap-3 transition-colors hover:text-[#F3E9DC]"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C49A6C]"
                />

                <span className="break-all">brewrush@gmail.com</span>
              </a>

              <a
                href="tel:+94771234567"
                className="group flex items-start gap-3 transition-colors hover:text-[#F3E9DC]"
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C49A6C]"
                />

                <span>+94 77 123 4567</span>
              </a>

              <div className="border-t border-[#4A3024] pt-4">
                <p className="leading-6">
                  Fresh coffee delivered
                  <br />
                  with care.
                </p>

                <a
                  href="#full-menu"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#C8A98D] transition-colors hover:text-[#F3E9DC]"
                >
                  Find your favourite brew
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-14 flex flex-col gap-5 border-t border-[#4A3024] pt-7 text-xs text-[#A58A78] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} BrewRush. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span>Privacy Policy</span>

            <span>Terms</span>

            <span className="flex items-center gap-2 text-[#C8A98D]">
              <Coffee size={14} />
              Crafted for coffee lovers.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;