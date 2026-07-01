import { Suspense } from "react";
import OrderConfirmationContent from "./OrderConfirmationContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Order Confirmed | Roger Wear",
};

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <Suspense fallback={<div className="flex-1" />}>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}
