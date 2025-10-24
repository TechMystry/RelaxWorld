import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurCategory from "@/components/ourCategory";
import Destinations from "@/components/Destinations";
import { Gallery } from "@/components/Gallery";
import Testimonials from "@/components/testnomials";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutUs";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <OurCategory />
      <Destinations />
      <AboutSection />
      <Gallery />
      <Testimonials />
      <Footer/>
    </main>
  );
}
