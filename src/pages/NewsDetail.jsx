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
  const [copied, setCopied] = useState(false);

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

  const pageUrl = window.location.href; // Gets the exact live URL
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(`${article.title} | TopZero Group`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract a short description for social media
  const metaDesc = article.content ? article.content.substring(0, 150) + '...' : 'Read the latest from TopZero Group.';

  return (
    <div className="news-page">
      <Helmet>
        <title>{article.title} | TopZero Group</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content="https://topzero-website.vercel.app/assets/brand/logo_no_bg.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={article.title} />
        <meta property="twitter:description" content={metaDesc} />
        <meta property="twitter:image" content="https://topzero-website.vercel.app/assets/brand/logo_no_bg.png" />
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
          
          {/* SHARE SECTION */}
          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
            <h3 style={{ color: 'var(--navy-900)', marginBottom: '1rem', fontSize: '1.2rem' }}>Share this article</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`} 
                target="_blank" rel="noreferrer"
                style={{ background: '#25D366', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                WhatsApp
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
                target="_blank" rel="noreferrer"
                style={{ background: '#1877F2', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} 
                target="_blank" rel="noreferrer"
                style={{ background: '#000000', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                X (Twitter)
              </a>
              <button 
                onClick={handleCopyLink}
                style={{ background: 'var(--surface)', color: 'var(--navy-900)', border: '1px solid #ddd', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
