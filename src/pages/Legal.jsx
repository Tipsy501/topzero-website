import { useLocation } from 'react-router-dom';
import './Legal.css';

export default function Legal() {
  const location = useLocation();
  const isPrivacy = location.pathname === '/privacy';

  return (
    <div className="legal-page">
      <section className="legal-hero">
        <h1>{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h1>
        <p>TopZero Group Proprietary Limited</p>
      </section>

      <div className="legal-content">
        {isPrivacy ? (
          <>
            <h2>1. Introduction</h2>
            <p>TopZero Group Proprietary Limited ("we", "us", "our") respects your privacy. This policy explains how we collect, use, and protect your personal information when you use our website.</p>
            
            <h2>2. Information We Collect</h2>
            <p>When you submit a contact form on our website, we collect the following information:</p>
            <ul>
              <li>Your Name</li>
              <li>Your Email Address</li>
              <li>The content of your message</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use this information solely to respond to your enquiries, discuss potential business partnerships, and provide support for our products.</p>

            <h2>4. Third-Party Services</h2>
            <p>Our website uses Google Firebase to securely store form submissions and application data. Firebase is a service provided by Google LLC.</p>
          </>
        ) : (
          <>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you agree to be bound by these Terms and Conditions.</p>
            
            <h2>2. Intellectual Property</h2>
            <p>All content on this website, including logos, text, and graphics, is the property of TopZero Group Proprietary Limited and is protected by copyright laws.</p>

            <h2>3. Use of Content</h2>
            <p>You may not reproduce, distribute, or modify any content from this website without our prior written consent.</p>

            <h2>4. Limitation of Liability</h2>
            <p>We strive to ensure all information on this website is accurate. However, we do not guarantee the completeness or accuracy of any information. Your use of the site is at your own risk.</p>
          </>
        )}
      </div>
    </div>
  );
}
