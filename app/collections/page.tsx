import type { Metadata } from "next";
import Categories from "@/components/ecommerce/categories";
import Footer from "@/components/ecommerce/footer";
import Navbar from "@/components/ecommerce/navbar";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0">
        <div className="border-[var(--border-color)] border-b px-6 pt-8 pb-12 md:px-12">
          <p className="mb-4 flex items-center gap-3 text-[var(--ink-muted)] text-eyebrow">
            <span className="block h-px w-6 bg-[var(--accent)]" />
            Browse
          </p>
          <h1 className="font-display text-[var(--ink)] text-display-lg">
            Collections
          </h1>
        </div>
        <Categories />
      </main>
      <Footer />
    </>
  );
}
