import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CounterStats from './components/CounterStats';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import HowWeWork from './components/HowWeWork';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import CtaForm from './components/CtaForm';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CounterStats />
        <Services />
        <WhyUs />
        <HowWeWork />
        <About />
        <Gallery />
        <Testimonials />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
