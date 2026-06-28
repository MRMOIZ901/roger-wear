import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurStoryContent from "@/components/OurStoryContent";

export const metadata: Metadata = {
  title: "Our Story | Roger Wear",
  description: "How Roger Wear went from a single cobbler's bench to a brand worn worldwide.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <OurStoryContent />
      <Footer />
    </div>
  );
}
