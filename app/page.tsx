import type { Metadata } from "next";
// import AnnouncementBar from "@/components/ecommerce/announcement-bar";
import Categories from "@/components/ecommerce/categories";
import CustomCursor from "@/components/ecommerce/custom-cursor";
import Editorial from "@/components/ecommerce/editorial";
import FeaturedProducts from "@/components/ecommerce/featured-products";
import Footer from "@/components/ecommerce/footer";
import Hero from "@/components/ecommerce/hero";
import HorizontalScroll from "@/components/ecommerce/horizontal-scroll";
import Marquee from "@/components/ecommerce/marquee";
import Navbar from "@/components/ecommerce/navbar";
import Newsletter from "@/components/ecommerce/newsletter";
import Press from "@/components/ecommerce/press";
import ScrollProgressBar from "@/components/ecommerce/scroll-progress-bar";

export const metadata: Metadata = {
  title: "M.dev — Luxury Editorial",
};

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      {/* <AnnouncementBar /> */}
      <Navbar />

      <main>
        {/* 01 — Cinematic hero */}
        <Hero />

        {/* 02 — Ticker */}
        <Marquee />

        {/* 03 — Featured products grid */}
        <FeaturedProducts />

        {/* 04 — Editorial feature / about split */}
        <Editorial />

        {/* 05 — Category tiles */}
        <Categories />

        {/* 06 — Pinned horizontal scroll */}
        <HorizontalScroll />

        {/* 07 — Press / testimonials */}
        <Press />

        {/* 08 — Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
