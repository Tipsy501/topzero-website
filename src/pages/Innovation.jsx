import './Innovation.css';

export default function Innovation() {
  return (
    <div className="innovation-page">
      <section className="innovation-hero">
        <h1>Innovation & Technology</h1>
        <p>We don't just adopt the future; we build it. Exploring AI, software, and digital transformation from an African perspective.</p>
      </section>

      <section className="innovation-section">
        
        {/* AI Section */}
        <div className="innovation-grid">
          <div className="innovation-text">
            <h2>Artificial Intelligence</h2>
            <p>We are actively researching and developing AI-powered platforms designed to automate workflows, enhance decision-making, and solve complex logistical challenges in emerging markets.</p>
            <p>From intelligent chatbots to predictive data analytics, our AI division is focused on creating practical, accessible tools that deliver measurable ROI.</p>
          </div>
          <div className="innovation-img">
            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" alt="Artificial Intelligence" />
          </div>
        </div>

        {/* Software Section */}
        <div className="innovation-grid reverse">
          <div className="innovation-text">
            <h2>Software Development</h2>
            <p>Our engineering team builds scalable, secure, and high-performance digital products. We leverage modern frameworks like React, Node.js, and cloud-native architectures to deliver enterprise-grade solutions.</p>
            <p>Whether it's a consumer mobile app on the Google Play Store or a bespoke B2B web platform, we write clean, maintainable code built to last.</p>
          </div>
          <div className="innovation-img">
            <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop" alt="Software Development" />
          </div>
        </div>

        {/* Digital Transformation */}
        <div className="innovation-grid">
          <div className="innovation-text">
            <h2>Digital Transformation</h2>
            <p>We partner with traditional businesses to modernize their operations. By migrating legacy systems to the cloud and implementing digital workflows, we help companies increase efficiency and reduce overhead.</p>
            <p>TopZero Group is committed to bridging the digital divide, ensuring that African businesses have access to the same technological advantages as global competitors.</p>
          </div>
          <div className="innovation-img">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" alt="Digital Transformation" />
          </div>
        </div>

      </section>

      <section className="african-innovation-banner">
        <h2>African Innovation. Global Impact.</h2>
        <p>We are proving that world-class technology can be built right here in Gaborone, Botswana, and scaled to the international market.</p>
      </section>
    </div>
  );
}
