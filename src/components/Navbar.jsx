import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Navbar.css';

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState('/assets/brand/logo_no_bg.png'); // Default fallback

  useEffect(() => {
    // Read the custom logo URL from Firestore
    const unsubscribe = onSnapshot(doc(db, 'siteSettings', 'branding'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().logoUrl) {
        setLogoUrl(docSnap.data().logoUrl);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logoUrl} alt="TopZero Group" />
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/businesses">Our Businesses</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/innovation">Innovation</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav-cta">
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </div>
    </header>
  );
}
