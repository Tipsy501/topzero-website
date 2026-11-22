import { Helmet } from 'react-helmet-async';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About TopZero Group</h1>
          <p>An African-founded business group with global ambitions.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container about-grid">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              TopZero Group Proprietary Limited was founded by Gabolekwe Topo Gabolekwe with a clear vision: 
              to build innovative businesses, digital products, and practical solutions that create lasting value. 
              Headquartered in Gaborone, Botswana, we operate at the intersection of technology, agriculture, 
              and manufacturing.
            </p>
            <h2>Our Philosophy</h2>
            <p>
              We believe in "Building Tomorrow, Today." We do not just anticipate the future; we actively construct it. 
              By combining local African insight with international standards of excellence, we develop products 
              that solve real problems and compete on a global stage.
            </p>
          </div>
          <div className="about-founder">
            <img src="/assets/brand/founder.png" alt="Gabolekwe Topo Gabolekwe" className="founder-img" />
            <h3>Gabolekwe Topo Gabolekwe</h3>
            <p className="founder-title">Founder & CEO</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mv-card">
              <h2>Our Mission</h2>
              <p>To develop and scale innovative businesses and digital solutions that drive economic growth and solve practical challenges in Africa and beyond.</p>
            </div>
            <div className="mv-card">
              <h2>Our Vision</h2>
              <p>To be a leading international business group, recognized for building sustainable technology, agricultural, and consumer product ventures.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


