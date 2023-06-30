import ChooseUs from "@/components/ChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="home">
      <Hero />
      <ChooseUs />
      <FeaturedProducts />
    </section>
  );
}
