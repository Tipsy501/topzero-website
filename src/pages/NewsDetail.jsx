import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';
import './News.css';

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'articles', id));
        if (docSnap.exists()) setArticle({ id: docSnap.id, ...docSnap.data() });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div style={{ padding: '10rem', textAlign: 'center' }}>Loading...</div>;
  if (!article) return <div style={{ padding: '10rem', textAlign: 'center' }}><h2>Article not found</h2><Link to="/news">Back to News</Link></div>;

  // Extract a short description for social media (first 150 chars)
  const metaDesc = article.content ? article.content.substring(0, 150) + '...' : 'Read the latest from TopZero Group.';
  const pageUrl = `https://topzero-group.vercel.app/news/${article.id}`;

  return (
    <div className="news-page">
      <Helmet>
        <title>{article.title} | TopZero Group</title>
        <meta name="description" content={metaDesc} />
        
        {/* Open Graph for Facebook / WhatsApp / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content="https://topzero-group.vercel.app/assets/brand/logo_no_bg.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={article.title} />
        <meta property="twitter:description" content={metaDesc} />
        <meta property="twitter:image" content="https://topzero-group.vercel.app/assets/brand/logo_no_bg.png" />
      </Helmet>

      <div className="news-container">
        <Link to="/news" style={{ color: 'var(--teal-accent)', display: 'inline-block', marginBottom: '1rem' }}>&larr; Back to News</Link>
        <div className="article-content">
          <span className="news-meta">{article.category || 'Update'}</span>
          <h1>{article.title}</h1>
          <p style={{ color: '#888' }}>Published on {article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString() : 'Draft'}</p>
          <div className="article-body">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}
