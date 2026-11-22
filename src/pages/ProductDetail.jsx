import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Portfolio.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ padding: '10rem', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '10rem', textAlign: 'center' }}><h2>Product not found</h2><Link to="/portfolio">Back to Portfolio</Link></div>;

  return (
    <div className="portfolio-section" style={{ padding: '8rem 2rem', minHeight: '80vh' }}>
      <div className="portfolio-container">
        <Link to="/portfolio" style={{ color: 'var(--teal-accent)', marginBottom: '2rem', display: 'inline-block' }}>&larr; Back to Portfolio</Link>
        
        <div style={{ background: 'white', padding: '4rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }} />
          )}
          <span className="card-category">{product.category === 'apps' ? 'Published App' : product.category === 'products' ? 'Live Product' : 'In Development'}</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--navy-900)', margin: '1rem 0' }}>{product.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--steel-blue)', lineHeight: '1.8', marginBottom: '3rem' }}>
            {product.description}
          </p>
          
          {product.link && (
            <a href={product.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              {product.category === 'apps' ? 'Download on Google Play' : 'Visit Website'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

