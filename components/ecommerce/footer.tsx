import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop/new" },
    { label: "Clothing", href: "/shop/clothing" },
    { label: "Bags", href: "/shop/bags" },
    { label: "Objects", href: "/shop/objects" },
    { label: "Archive Sale", href: "/shop/archive" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Journal", href: "/journal" },
    { label: "Stockists", href: "/stockists" },
  ],
  Support: [
    { label: "Sizing Guide", href: "/sizing" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Care Guide", href: "/care" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-[var(--border-color)] border-t bg-[var(--canvas)]">
      {/* Main footer grid */}
      <div className="mx-auto px-6 pt-20 pb-12 md:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-6 text-[var(--ink)] text-eyebrow tracking-[0.35em]">
              M.dev
            </p>
            <p className="max-w-48 text-[var(--ink-muted)] text-sm leading-relaxed">
              Objects for considered living. Crafted with intention, built to
              last.
            </p>
            <div className="mt-8 flex gap-4">
              {["Instagram", "Pinterest", "X"].map((social) => (
                <a
                  className="text-[var(--ink-muted)] text-eyebrow transition-colors duration-300 hover:text-[var(--ink)]"
                  href="#"
                  key={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="mb-5 text-[var(--ink)] text-eyebrow">{group}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-[var(--ink-muted)] text-sm transition-colors duration-300 hover:text-[var(--ink)]"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex flex-col items-start justify-between gap-4 border-[var(--border-color)] border-t px-6 py-6 md:flex-row md:items-center md:px-12">
        <p className="text-[var(--ink-muted)] text-xs">
          © {new Date().getFullYear()} M.dev. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map(
            (item) => (
              <a
                className="text-[var(--ink-muted)] text-xs transition-colors duration-300 hover:text-[var(--ink)]"
                href="#"
                key={item}
              >
                {item}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
