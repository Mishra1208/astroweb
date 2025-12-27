import Navbar from "@/components/Navbar";
import Hero from '../components/Hero';
import FindMySign from '@/components/FindMySign';
import ZodiacGrid from '../components/ZodiacGrid';
import TarotReading from '@/components/TarotReading';
import About from '@/components/About';
import Footer from '../components/Footer';
import Panchang from '@/components/Panchang';
import LoadingScreen from '@/components/LoadingScreen'; // Import Loader

export default function Home() {
  return (
    <main>
      <LoadingScreen /> {/* Added Sri Yantra Loader */}
      <Navbar />
      <Hero />
      <Panchang />
      <FindMySign />
      <ZodiacGrid />
      <TarotReading />
      <About />
      <Footer />
    </main>
  );
}
