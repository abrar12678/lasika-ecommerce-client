import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <main className="w-full relative bg-[#faf9f6]">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
    </main>
  );
}