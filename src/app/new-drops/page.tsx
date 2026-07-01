import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogGrid from "@/components/CatalogGrid";
import { getProducts } from "@/lib/supabase";

export const revalidate = 3600;

export const metadata = {
  title: "New Drops | Roger Wear",
};

export default async function NewDropsPage() {
  const products = await getProducts();
  const newest = products.slice(0, 8);

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 px-6 sm:px-12 pt-32 pb-24 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          New <span className="text-amber-700">Drops</span>
        </h1>
        <p className="text-zinc-400 mb-12">The latest styles just added to Roger Wear.</p>
        <CatalogGrid products={newest} />
      </main>
      <Footer />
    </div>
  );
}
