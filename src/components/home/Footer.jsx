
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const footerSections = [
  {
    title: "SHOP",
    links: [
      { label: "All Fragrances", path: "/shop" },
      { label: "Best Sellers", path: "/shop" },
      { label: "New Arrivals", path: "/shop" },
    ],
  },
  {
    title: "FRAGRANCES",
    links: [
      { label: "Woody", path: "/shop" },
      { label: "Fresh", path: "/shop" },
      { label: "Floral", path: "/shop" },
      { label: "Amber & Spice", path: "/shop" },
    ],
  },
  {
    title: "ABOUT",
    links: [
      { label: "Our Story", path: "/" },
      { label: "Ingredients", path: "/" },
      { label: "Sustainability", path: "/" },
    ],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      { label: "Shipping & Returns", path: "/" },
      { label: "FAQ", path: "/" },
      { label: "Contact Us", path: "/" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-[#151311] text-[#c5c0ba]">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[4.5%]">

        {/* Main footer */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:grid-cols-3 lg:grid-cols-[1.55fr_repeat(4,minmax(0,1fr))] lg:gap-x-10 lg:py-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:border-r lg:border-white/15 lg:pr-10">
            <Link
              to="/"
              className="inline-block font-serif text-4xl tracking-[-0.06em] text-[#f5f1ec] sm:text-[42px]"
            >
              BLUME
            </Link>

            <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#c5c0ba]">
              Fragrance, a deeper connection.
            </p>
          </div>

          {/* Navigation columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-[9px] font-medium uppercase tracking-[0.28em] text-[#e7e1d9]">
                {section.title}
              </h3>

              <ul className="space-y-2.5">
                {section.links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-xs tracking-[0.01em] text-[#aaa49d] transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-5 border-t border-white/15 py-5 text-[10px] tracking-wide sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#89837d]">
            © {new Date().getFullYear()} Blume. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[#aaa49d]">
            <Link to="/" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>

            <span className="text-white/25">|</span>

            <Link to="/" className="transition-colors hover:text-white">
              Terms
            </Link>

            <span className="text-white/25">|</span>

            <Link to="/" className="transition-colors hover:text-white">
              Cookies
            </Link>

            <span className="text-white/25">|</span>

            <Link
              to="/"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              India (INR)
              <ChevronDown size={13} strokeWidth={1.3} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
