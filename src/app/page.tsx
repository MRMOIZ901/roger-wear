import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/supabase";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <Features />
      <Products products={products} />
      <Testimonials />
      <Footer />
    </div>
  );
}
