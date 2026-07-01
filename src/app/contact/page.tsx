import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "./ContactContent";

export const metadata = {
  title: "Contact Us | Roger Wear",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <ContactContent />
      <Footer />
    </div>
  );
}
