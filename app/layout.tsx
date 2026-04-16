import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import CartDrawer from "@/components/ecommerce/cart-drawer";
import ScrollProvider from "@/components/providers/scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | M.dev",
    default: "M.dev — Luxury Editorial",
  },
  description:
    "A curated collection of premium lifestyle objects, crafted for those who live deliberately.",
  keywords: ["luxury", "editorial", "fashion", "lifestyle", "curated"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "M.dev",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◆</text></svg>"
          rel="icon"
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
      </head>
      <body className="grain">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <WishlistProvider>
            <CartProvider>
              <ScrollProvider>{children}</ScrollProvider>
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
