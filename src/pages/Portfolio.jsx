import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Portfolio.css';

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live data from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredData = filter === "all" ? products : products.filter(item => item.category === filter);

  return (
    <div>
      <section className="portfolio-hero">
        <h1>Our Portfolio</h1>
        <p>Real products, live applications, and innovative projects built by TopZero Group.</p>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="filter-tabs">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Work</button>
            <button className={`filter-btn ${filter === 'apps' ? 'active' : ''}`} onClick={() => setFilter('apps')}>Mobile Apps</button>
            <button className={`filter-btn ${filter === 'products' ? 'active' : ''}`} onClick={() => setFilter('products')}>Live Products</button>
            <button className={`filter-btn ${filter === 'projects' ? 'active' : ''}`} onClick={() => setFilter('projects')}>Projects & Innovation</button>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--steel-blue)' }}>Loading portfolio...</p>
          ) : filteredData.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--steel-blue)' }}>No projects found in this category.</p>
          ) : (
            <div className="portfolio-grid">
              {filteredData.map(item => (
                <div key={item.id} className="portfolio-card">
                  <div className="card-image" style={{ overflow: 'hidden', position: 'relative' }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                      <span className="card-image-placeholder">{item.title ? item.title.charAt(0) : '?'}</span>
                    )}
                  </div>
                  <div className="card-content">
                    <span className="card-category">
                      {item.category === 'apps' ? 'Published App' : item.category === 'products' ? 'Live Product' : 'In Development'}
                    </span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                    <div className="card-links">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                          {item.category === 'apps' ? 'Google Play' : 'Visit Website'}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--steel-blue)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                          Coming Soon
                        </span>
                      )}
                      <Link to={`/portfolio/${item.id}`} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


