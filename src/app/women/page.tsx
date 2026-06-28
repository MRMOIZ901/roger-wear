import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WomenComingSoon from "@/components/WomenComingSoon";

export const metadata: Metadata = {
  title: "Women | Roger Wear",
  description: "The Roger Wear women's collection is launching soon.",
};

export default function WomenPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <WomenComingSoon />
      <Footer />
    </div>
  );
}
