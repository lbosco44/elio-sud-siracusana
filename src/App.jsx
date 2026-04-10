import ErrorBoundary from './components/ErrorBoundary';
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
    <ErrorBoundary>
      <Navbar />
      <main>
        <Hero />
        <ErrorBoundary><CounterStats /></ErrorBoundary>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><WhyUs /></ErrorBoundary>
        <ErrorBoundary><HowWeWork /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Gallery /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><Faq /></ErrorBoundary>
        <ErrorBoundary><CtaForm /></ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFab />
    </ErrorBoundary>
  );
}
