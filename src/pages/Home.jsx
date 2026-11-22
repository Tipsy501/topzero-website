import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
      {/* Premium Hero */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <h1>Building Ideas.<br/>Creating Solutions.<br/>Growing Opportunities.</h1>
          <p>
            TopZero Group is an African-founded business group developing technology, 
            digital products, agricultural ventures, and consumer products for global markets.
          </p>
          <div className="hero-btns">
            <Link to="/portfolio" className="btn-primary">Explore Our Portfolio</Link>
            <Link to="/contact" className="btn-outline">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* Image Showcase (Websites & Apps) */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="showcase-grid">
            <div className="showcase-text">
              <h2>We build world-class digital experiences.</h2>
              <p>
                Beyond our own products, TopZero Group designs and develops premium websites, 
                platforms, and mobile applications for clients across Africa and the world. 
                We blend cutting-edge technology with elegant design.
              </p>
              <Link to="/contact" className="btn-outline">Request a Quote</Link>
            </div>
            <div className="showcase-images">
              <div className="img-card img-card-1">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Digital Dashboard" />
              </div>
              <div className="img-card img-card-2">
                <img src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop" alt="Mobile App Development" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Divisions */}
      <section className="section services-section">
        <div className="container">
          <h2>Our Business Divisions</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Technology & AI</h3>
              <p>Developing software, AI-driven tools, and bespoke web applications to solve complex business challenges.</p>
            </div>
            <div className="service-card">
              <h3>Digital Products</h3>
              <p>Publishing premium mobile applications and digital platforms that empower users globally.</p>
            </div>
            <div className="service-card">
              <h3>Agriculture</h3>
              <p>Gabolekwe Farms: Cultivating sustainable agricultural ventures to secure food supply and drive agritech.</p>
            </div>
            <div className="service-card">
              <h3>Manufacturing</h3>
              <p>Munyu Fine Salt: Producing high-quality, essential consumer products for African households.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps CTA */}
      <section className="section" style={{ backgroundColor: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>Real Products. Live Today.</h2>
          <p style={{ color: 'var(--steel-blue)', marginBottom: '2rem' }}>Download our published applications from the Google Play Store.</p>
          <Link to="/portfolio" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            View All Apps & Products
          </Link>
        </div>
      </section>
    </div>
  );
}
