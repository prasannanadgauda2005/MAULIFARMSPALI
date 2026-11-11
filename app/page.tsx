import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { VillaSpaces } from '../components/VillaSpaces';
import { Highlights } from '../components/Highlights';
import { Gallery } from '../components/Gallery';
import { Location } from '../components/Location';
import { BookingSection } from '../components/BookingSection';
import { Footer } from '../components/Footer';
import { FloatingButtons } from '../components/FloatingButtons';
import { DealsModal } from '../components/DealsModal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <VillaSpaces />
        <Highlights />
        <Gallery />
        <Location />
        <BookingSection />
      </main>
      <Footer />
      <FloatingButtons />
      <DealsModal />
    </>
  );
}
