import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import WatchBreakdownSection from "@/components/WatchBreakdownSection";

export default function Home() {
  return (
    <main className="w-full relative bg-[#faf9f6] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <WatchBreakdownSection />
    </main>
  );
}