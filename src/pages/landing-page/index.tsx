import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import ServicesSection from './components/ServicesSection';
import StatsGrid from './components/StatsGrid';
import Testimonials from './components/Testimonials';
import TypographySection from './components/TypographySection';
import ContactHero from './components/ContactHero';
import Footer from './components/Footer';
import './styles.css';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <IntroSection />
      <ServicesSection />
      <StatsGrid />
      <Testimonials />
      <TypographySection />
      <ContactHero />
      <Footer />
    </div>
  );
};

export default LandingPage;
