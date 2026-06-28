import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogGrid from "@/components/CatalogGrid";
import { getProducts } from "@/lib/supabase";

export const revalidate = 0;

export const metadata = {
  title: "Men's Shoes | Roger Wear",
};

export default async function MenPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 px-6 sm:px-12 pt-32 pb-24 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Men&apos;s <span className="text-amber-700">Collection</span>
        </h1>
        <p className="text-zinc-400 mb-12">{products.length} styles handcrafted in leather.</p>
        <CatalogGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}
