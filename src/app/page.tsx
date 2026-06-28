import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <CTA />
      <Footer />
    </div>
  );
}
