import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Footer.css';

export default function Footer() {
  const [socials, setSocials] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'siteSettings', 'socials'), (docSnap) => {
      if (docSnap.exists()) {
        setSocials(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/assets/brand/logo_no_bg.png" alt="TopZero Group" className="footer-logo" />
          <p>Building Tomorrow, Today.<br/>Gaborone, Botswana.</p>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/businesses">Our Businesses</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {socials.facebook && <a href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer">Twitter</a>}
            {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {socials.tiktok && <a href={socials.tiktok} target="_blank" rel="noreferrer">TikTok</a>}
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>&copy; {new Date().getFullYear()} TopZero Group Proprietary Limited. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
