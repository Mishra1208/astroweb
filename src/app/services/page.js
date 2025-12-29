import Hero from '@/components/Hero';
import FindMySign from '@/components/FindMySign';
import ZodiacGrid from '@/components/ZodiacGrid';
import TarotReading from '@/components/TarotReading';
import About from '@/components/About';
import Panchang from '@/components/Panchang';

export default function Services() {
  return (
    <main>
      {/* LoadingScreen moved to layout.js */}
      <Hero />
      <Panchang />
      <FindMySign />
      <ZodiacGrid />
      <TarotReading />
      <About />
    </main >
  );
}
