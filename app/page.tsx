import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { WaterfallSpotlight } from '../components/WaterfallSpotlight';
import { Gallery } from '../components/Gallery';
import { Experiences } from '../components/Experiences';
import { Amenities } from '../components/Amenities';
import { BookingCTA } from '../components/BookingCTA';
import { BookingForm } from '../components/BookingForm';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Location } from '../components/Location';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { FloatingButtons } from '../components/FloatingButtons';
import { PropertyTourWidget } from '../components/PropertyTourWidget';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <WaterfallSpotlight />
        <Gallery />
        <Experiences />
        <Amenities />
        <BookingCTA />
        <BookingForm />
        <Testimonials />
        <FAQ />
        <Location />
        <Contact />
      </main>
      
      <Footer />
      <FloatingButtons />
      <PropertyTourWidget />
    </>
  );
}
