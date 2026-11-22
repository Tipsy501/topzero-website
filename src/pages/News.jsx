import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './News.css';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="news-page">
      <section className="news-hero">
        <h1>News & Insights</h1>
        <p>Latest updates, announcements, and perspectives from TopZero Group.</p>
      </section>

      <div className="news-container">
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading articles...</p>
        ) : articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--steel-blue)' }}>No articles published yet.</p>
        ) : (
          <div className="news-grid">
            {articles.map(article => (
              <div key={article.id} className="news-card">
                <span className="news-meta">{article.category || 'Company Update'} • {article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString() : 'Draft'}</span>
                <h2>{article.title}</h2>
                <p className="news-excerpt">{article.content.substring(0, 150)}...</p>
                <Link to={`/news/${article.id}`} className="btn-read">Read Article</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
