import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/supabase";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product ? `${product.name} | Roger Wear` : "Product | Roger Wear",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
