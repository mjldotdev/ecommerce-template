export interface Article {
  author: string;
  category: string;
  date: string;
  excerpt: string;
  featured?: boolean;
  id: string;
  image: string;
  readTime: string;
  slug: string;
  title: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "on-the-patience-of-craft",
    title: "On the Patience of Craft",
    excerpt:
      "A morning spent with a fourth-generation saddler in the hills above Florence — and what he taught us about the value of slowness.",
    category: "Makers",
    readTime: "8 min",
    date: "April 2025",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=900&q=85",
    featured: true,
    author: "Elsa Verne",
  },
  {
    id: "2",
    slug: "the-case-for-buying-less",
    title: "The Case for Buying Less",
    excerpt:
      "We spend our days curating things to sell. Which makes this a strange thing to write. But we believe it anyway.",
    category: "Essays",
    readTime: "5 min",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85",
    author: "Théo Marchand",
  },
  {
    id: "3",
    slug: "five-objects-for-considered-living",
    title: "Five Objects for Considered Living",
    excerpt:
      "Not a wishlist. A proposition: these are the objects that, once you have them, you stop looking for anything else in that category.",
    category: "Curation",
    readTime: "4 min",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=85",
    author: "Ines Sato",
  },
  {
    id: "4",
    slug: "what-linen-knows",
    title: "What Linen Knows",
    excerpt:
      "The oldest textile we still wear, and why it remains — after five thousand years — the most honest material in any wardrobe.",
    category: "Materials",
    readTime: "6 min",
    date: "February 2025",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85",
    author: "Elsa Verne",
  },
  {
    id: "5",
    slug: "the-japanese-concept-of-ma",
    title: "The Japanese Concept of Ma",
    excerpt:
      "Negative space is not the absence of something — it is the presence of breath, of pause, of intention. An essay on designing with emptiness.",
    category: "Essays",
    readTime: "7 min",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85",
    author: "Ines Sato",
  },
  {
    id: "6",
    slug: "atelier-visit-portugal",
    title: "Atelier Visit: Porto",
    excerpt:
      "Three days in northern Portugal with the ceramic maker behind our Pour Vessel — workshop notes, photographs, and an honest conversation about scale.",
    category: "Makers",
    readTime: "10 min",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&q=85",
    author: "Théo Marchand",
  },
];

export const journalCategories = [
  "All",
  "Makers",
  "Essays",
  "Curation",
  "Materials",
];
