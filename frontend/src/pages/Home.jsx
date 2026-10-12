import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowDown, FiArrowRight, FiSun } from 'react-icons/fi';
import AboutSection from '../components/common/AboutSection.jsx';

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#about') document.getElementById('about')?.scrollIntoView();
  }, [hash]);
  return (
    <div className="landing-page">
      <section className="landing-hero" aria-labelledby="landing-title">
        <picture className="landing-photo-frame">
          <source media="(max-width: 600px) and (orientation: portrait)" srcSet="/landing-farm-mobile.jpg" width="1200" height="1600" />
          <source media="(max-width: 1200px)" srcSet="/landing-farm-tablet.jpg" width="2048" height="1536" />
          <img className="landing-photo" src="/landing-farm-desktop.jpg" width="3840" height="2160" alt="Green agricultural fields and rolling hills in warm evening sunlight" fetchPriority="high" decoding="async" />
        </picture>
        <div className="landing-shade" />
        <div className="landing-hero-content">
          <span className="landing-kicker"><span /> A little weather wisdom. A better tomorrow.</span>
          <h1 id="landing-title">Smarter irrigation.<br />Healthier fields.</h1>
          <p>Let the weather guide your next move. Care for your crops with simple irrigation advice, tailored to your farm.</p>
          <div className="landing-actions">
            <Link className="landing-primary" to="/register">Get started <FiArrowRight aria-hidden="true" /></Link>
            <a className="landing-secondary" href="#about">About KisanSetu <FiArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="landing-hero-bottom">
          <div className="landing-caption"><FiSun aria-hidden="true" /><span>Rooted in nature.<br /><strong>Informed by weather.</strong></span></div>
          <a href="#about" className="landing-explore">Explore KisanSetu <span><FiArrowDown aria-hidden="true" /></span></a>
        </div>
      </section>
      <AboutSection />
    </div>
  );
}
