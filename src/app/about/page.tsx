import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Roger Wear",
  description: "The story behind Roger Wear — premium leather-crafted shoes built for the street.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
}
