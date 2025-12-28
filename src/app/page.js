import Hero from '../components/Hero';
import FindMySign from '@/components/FindMySign';
import ZodiacGrid from '../components/ZodiacGrid';
import TarotReading from '@/components/TarotReading';
import About from '@/components/About';
import Panchang from '@/components/Panchang';
import LoadingScreen from '@/components/LoadingScreen'; // Import Loader

export default function Home() {
  return (
    <main>
      <LoadingScreen /> {/* Added Sri Yantra Loader */}
      <Hero />
      <Panchang />
      <FindMySign />
      <ZodiacGrid />
      <TarotReading />
      <About />
    </main>
  );
}
