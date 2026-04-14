export interface Product {
  category: string;
  hoverImage?: string;
  id: string;
  image: string;
  isNew?: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  slug: string;
  subtitle: string;
  tag?: string;
}

export interface Category {
  count: number;
  id: string;
  image: string;
  name: string;
  slug: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "atelier-leather-tote",
    name: "Atelier Tote",
    subtitle: "Full-grain vegetable-tanned leather",
    price: 1240,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
    // hoverImage:
    //   "https://images.unsplash.com/photo-1584917865442-de89be371d6e?w=800&q=85",
    category: "Bags",
    tag: "New Arrival",
    isNew: true,
  },
  {
    id: "2",
    slug: "linen-overshirt",
    name: "Linen Overshirt",
    subtitle: "100% Belgian linen, relaxed silhouette",
    price: 420,
    originalPrice: 560,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85",
    category: "Clothing",
    tag: "Archive Sale",
  },
  {
    id: "3",
    slug: "ceramic-pour-vessel",
    name: "Pour Vessel",
    subtitle: "Hand-thrown stoneware with ash glaze",
    price: 185,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=85",
    // hoverImage:
    //   "https://images.unsplash.com/photo-1612532978750-d6fb2e4c9dc2?w=800&q=85",
    category: "Objects",
    isNew: true,
  },
  {
    id: "4",
    slug: "merino-long-coat",
    name: "Merino Coat",
    subtitle: "Boiled merino wool, longline cut",
    price: 1680,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85",
    category: "Clothing",
    tag: "Signature",
  },
  {
    id: "5",
    slug: "brass-desk-lamp",
    name: "Studio Lamp",
    subtitle: "Solid brass with linen shade",
    price: 840,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=85",
    category: "Lighting",
    isNew: true,
  },
  {
    id: "6",
    slug: "terrazzo-tray",
    name: "Terrazzo Tray",
    subtitle: "Poured marble composite, small",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85",
    category: "Objects",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85",
    slug: "clothing",
  },
  {
    id: "2",
    name: "Bags",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900&q=85",
    slug: "bags",
  },
  {
    id: "3",
    name: "Objects",
    count: 36,
    image:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=85",
    slug: "objects",
  },
  {
    id: "4",
    name: "Lighting",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900&q=85",
    slug: "lighting",
  },
];

export const marqueeItems = [
  "New Arrivals",
  "Timeless Objects",
  "Curated Living",
  "Archive Sale",
  "Free Returns",
  "Handcrafted",
  "Sustainable",
  "Editorial",
];
