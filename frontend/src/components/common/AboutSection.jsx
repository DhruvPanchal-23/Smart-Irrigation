import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutSection() {
  return <section className="about-page" id="about" aria-labelledby="about-title">
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero-copy"><span className="about-kicker">Sugarcane growing guide</span><h2 className="about-title" id="about-title">Grow healthier sugarcane with every drop in mind.</h2><p>Sugarcane is a long-duration, water-demanding crop. Better results come from healthy planting material, timely field care, good drainage, and irrigation decisions that respond to weather, soil, and crop stage.</p><div className="about-actions"><Link className="button" to="/register">Start with KisanSetu <FiArrowRight aria-hidden="true" /></Link></div></div>
      <div className="about-field-card" aria-label="Sugarcane crop overview"><div className="about-sun" aria-hidden="true" /><div className="about-cane" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><div className="about-field-card-content"><span>Think in seasons, not days</span><strong>Soil + crop stage + weather</strong><p>Use all three before deciding when and how much to irrigate.</p></div></div>
    </section>

  </section>;
}
