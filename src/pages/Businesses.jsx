import { Helmet } from 'react-helmet-async';
import './Businesses.css';

export default function Businesses() {
  return (
    <div>
      <Helmet>
        <title>Our Businesses | TopZero Group</title>
        <meta name='description' content='Explore TopZero Group business divisions: Technology & AI, Digital Products, Gabolekwe Farms, and Munyu Fine Salt.' />
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <h1>Our Businesses</h1>
          <p>Diversified ventures driving innovation and growth.</p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="business-list">
            
            <div className="business-item">
              <div className="business-img">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" alt="Technology" />
              </div>
              <div className="business-info">
                <h2>Technology & AI</h2>
                <p>We build intelligent software, bespoke web applications, and AI-driven tools. From complex backend architectures to seamless user interfaces, our technology division powers the digital transformation of businesses across Africa.</p>
              </div>
            </div>

            <div className="business-item reverse">
              <div className="business-img">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Digital Products" />
              </div>
              <div className="business-info">
                <h2>Digital Products</h2>
                <p>We conceptualize, develop, and publish digital products—including mobile applications on the Google Play Store. Our portfolio includes tools for education, productivity, and daily utility used by thousands.</p>
              </div>
            </div>

            <div className="business-item">
              <div className="business-img">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop" alt="Agriculture" />
              </div>
              <div className="business-info">
                <h2>Agriculture & Agribusiness</h2>
                <h3 style={{ color: 'var(--teal-accent)', marginBottom: '1rem' }}>Gabolekwe Farms</h3>
                <p>Our agricultural division is focused on sustainable farming and food security. Gabolekwe Farms leverages modern agricultural techniques to deliver high-quality produce and drive agricultural innovation in Botswana.</p>
              </div>
            </div>

            <div className="business-item reverse">
              <div className="business-img">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Manufacturing" />
              </div>
              <div className="business-info">
                <h2>Manufacturing & Consumer Products</h2>
                <h3 style={{ color: 'var(--teal-accent)', marginBottom: '1rem' }}>Munyu Fine Salt</h3>
                <p>We manufacture and distribute high-quality consumer goods. Munyu Fine Salt represents our commitment to providing essential, premium household products to the African market, built on reliable supply chains.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

