export type Product = {
  slug: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    slug: "artisan-edge",
    name: "Artisan Edge",
    price: 10000,
    images: [
      "/products/artisan-edge/1.jpg",
      "/products/artisan-edge/2.jpg",
      "/products/artisan-edge/3.jpg",
      "/products/artisan-edge/4.jpg",
    ],
    description:
      "A clean slip-on silhouette crafted from full-grain leather, finished with a cushioned sole for all-day comfort. Built for the street, polished enough for the office.",
    features: [
      "Full-grain genuine leather upper",
      "Slip-on design, no laces needed",
      "Cushioned, flexible rubber sole",
      "Breathable perforated detailing",
    ],
  },
  {
    slug: "royal-crest",
    name: "Royal Crest",
    price: 10000,
    images: [
      "/products/royal-crest/1.jpg",
      "/products/royal-crest/2.jpg",
      "/products/royal-crest/3.jpg",
      "/products/royal-crest/4.jpg",
    ],
    description:
      "A premium leather loafer with a signature metal buckle accent. Hand-finished stitching and a low-profile sole give it a sharp, refined look for any occasion.",
    features: [
      "Premium leather upper with textured panel",
      "Signature metal buckle detail",
      "Hand-stitched finish",
      "Lightweight, low-profile sole",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
