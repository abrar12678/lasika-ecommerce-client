import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import WatchDetail from "@/components/WatchDetail";
import WatchBoxSection from "@/components/WatchBoxSection";

export default function Home() {
  return (
    <main className="w-full relative bg-[#faf9f6]">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <WatchDetail />
      <WatchBoxSection />
    </main>
  );
}
