import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({ title: '', category: 'apps', description: '', link: '', imageUrl: '' });
  const [articleData, setArticleData] = useState({ title: '', category: 'Company Update', content: '' });
  const [socialData, setSocialData] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '', tiktok: '' });
  
  // Edit mode states
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === 'topogabolekwe@gmail.com') {
        setUser(currentUser);
      } else {
        navigate('/admin');
      }
    });

    const unsubscribeDb = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    }, (error) => {
      setErrorMsg(`Read Error: ${error.message}`);
    });

    return () => { unsubscribeAuth(); unsubscribeDb(); };
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'messages') {
      const unsub = onSnapshot(collection(db, 'enquiries'), (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        msgs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setEnquiries(msgs);
      });
      return () => unsub();
    }
    if (activeTab === 'news') {
      const unsub = onSnapshot(collection(db, 'articles'), (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setArticles(items);
      });
      return () => unsub();
    }
  }, [activeTab]);

    useEffect(() => {
    if (activeTab === 'social') {
      const unsub = onSnapshot(doc(db, 'siteSettings', 'socials'), (docSnap) => {
        if (docSnap.exists()) {
          setSocialData(docSnap.data());
        }
      });
      return () => unsub();
    }
  }, [activeTab]);

  const handleSaveSocials = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'siteSettings', 'socials'), socialData, { merge: true });
      alert('Social links saved successfully!');
    } catch (error) {
      setErrorMsg(`Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/admin');
  };

  // --- PRODUCT ACTIONS ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), formData);
        setEditingProductId(null);
      } else {
        await addDoc(collection(db, 'products'), { ...formData, createdAt: serverTimestamp() });
      }
      setFormData({ title: '', category: 'apps', description: '', link: '', imageUrl: '' });
    } catch (error) {
      setErrorMsg(`Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setFormData({ title: product.title, category: product.category, description: product.description, link: product.link || '', imageUrl: product.imageUrl || '' });
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try { await deleteDoc(doc(db, 'products', id)); } catch (error) { setErrorMsg(`Failed to delete: ${error.message}`); }
    }
  };

  // --- ARTICLE ACTIONS ---
  const handleAddArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingArticleId) {
        await updateDoc(doc(db, 'articles', editingArticleId), articleData);
        setEditingArticleId(null);
      } else {
        await addDoc(collection(db, 'articles'), { ...articleData, createdAt: serverTimestamp() });
      }
      setArticleData({ title: '', category: 'Company Update', content: '' });
    } catch (error) {
      setErrorMsg(`Failed to publish: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticleId(article.id);
    setArticleData({ title: article.title, category: article.category, content: article.content });
  };

  const handleDeleteArticle = async (id) => {
    if(window.confirm("Delete this article?")) {
      try { await deleteDoc(doc(db, 'articles', id)); } catch (error) { setErrorMsg(`Failed to delete: ${error.message}`); }
    }
  };

  if (!user) return <div style={{ padding: '10rem', textAlign: 'center' }}>Loading secure dashboard...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/assets/brand/logo_no_bg.png" alt="TopZero" style={{ filter: 'brightness(0) invert(1)' }} />
          <span>Admin Portal</span>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Dashboard Overview</button>
          <button className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}>Portfolio Manager</button>
          <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>Contact Enquiries</button>
          <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>News & Articles</button>
          <button className={activeTab === 'social' ? 'active' : ''} onClick={() => setActiveTab('social')}>Social Media</button>
          <button className={activeTab === 'branding' ? 'active' : ''} onClick={() => setActiveTab('branding')}>Branding & Logo</button>
        </nav>
        <div className="admin-logout">
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab === 'news' ? 'News & Articles' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div style={{ color: 'var(--steel-blue)' }}>Logged in as: <strong>{user.email}</strong></div>
        </header>

        {errorMsg && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

                {activeTab === 'overview' && (
          <div>
            {/* STATS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="admin-card" style={{ borderLeft: '4px solid var(--teal-accent)' }}>
                <h3 style={{ color: 'var(--steel-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Portfolio Items</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--navy-900)' }}>{products.length}</p>
              </div>
              <div className="admin-card" style={{ borderLeft: '4px solid var(--teal-accent)' }}>
                <h3 style={{ color: 'var(--steel-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Published Articles</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--navy-900)' }}>{articles.length}</p>
              </div>
              <div className="admin-card" style={{ borderLeft: '4px solid var(--teal-accent)' }}>
                <h3 style={{ color: 'var(--steel-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Enquiries</h3>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--navy-900)' }}>{enquiries.length}</p>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="admin-card">
              <h2>Recent Enquiries</h2>
              {enquiries.length === 0 ? (
                <p style={{ color: 'var(--steel-blue)' }}>No enquiries yet. When someone uses the contact form, it will appear here.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {enquiries.slice(0, 3).map(msg => (
                    <div key={msg.id} style={{ borderLeft: '3px solid var(--teal-accent)', paddingLeft: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong>{msg.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>{msg.email}</span>
                      </div>
                      <p style={{ color: 'var(--steel-blue)', fontSize: '0.95rem' }}>{msg.message.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setActiveTab('messages')} style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--teal-accent)', fontWeight: 'bold', cursor: 'pointer' }}>View all enquiries &rarr;</button>
            </div>
          </div>
        )} />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="apps">Mobile App</option>
                  <option value="products">Live Product</option>
                  <option value="projects">Project / Innovation</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea placeholder="Professional description..." required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="admin-form-group">
                <label>Link (Google Play or Website)</label>
                <input type="url" placeholder="https://..." value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
              </div>
                            <div className="admin-form-group">
                <label>Image URL (Optional)</label>
                <input type="url" placeholder="https://example.com/image.png" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <button type="submit" className="admin-btn" disabled={loading}>{loading ? 'Saving...' : editingProductId ? 'Update Project' : 'Add Project'}</button>
              {editingProductId && <button onClick={() => { setEditingProductId(null); setFormData({ title: '', category: 'apps', description: '', link: '', imageUrl: '' }); }} style={{ marginLeft: '1rem', background: 'transparent', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel Edit</button>}
            </form>

            <h3>Your Current Projects</h3>
            <div style={{ marginTop: '1rem' }}>
              {products.length === 0 ? <p>No products added yet.</p> : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: '1rem 0' }}>Title</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '1rem 0' }}><strong>{p.title}</strong></td>
                        <td>{p.category}</td>
                        <td style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditProduct(p)} style={{ background: 'var(--teal-accent)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(p.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="admin-card">
            <h2>Contact Enquiries</h2>
            {enquiries.length === 0 ? <p>No messages yet.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {enquiries.map(msg => (
                  <div key={msg.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <strong>{msg.name} ({msg.email})</strong>
                    </div>
                    <p style={{ color: 'var(--steel-blue)' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="admin-card">
            <h2>{editingArticleId ? 'Edit Article' : 'Publish New Article'}</h2>
            <form onSubmit={handleAddArticle} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
              <div className="admin-form-group">
                <label>Article Title</label>
                <input type="text" placeholder="e.g. TopZero Group Launches New App" required value={articleData.title} onChange={e => setArticleData({...articleData, title: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <select value={articleData.category} onChange={e => setArticleData({...articleData, category: e.target.value})}>
                  <option value="Company Update">Company Update</option>
                  <option value="Tech Insights">Tech Insights</option>
                  <option value="Press Release">Press Release</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Article Content</label>
                <textarea placeholder="Write your article here..." required style={{ minHeight: '200px' }} value={articleData.content} onChange={e => setArticleData({...articleData, content: e.target.value})}></textarea>
              </div>
                            <div className="admin-form-group">
                <label>Image URL (Optional)</label>
                <input type="url" placeholder="https://example.com/image.png" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <button type="submit" className="admin-btn" disabled={loading}>{loading ? 'Publishing...' : editingArticleId ? 'Update Article' : 'Publish Article'}</button>
              {editingArticleId && <button onClick={() => { setEditingArticleId(null); setArticleData({ title: '', category: 'Company Update', content: '' }); }} style={{ marginLeft: '1rem', background: 'transparent', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel Edit</button>}
            </form>

            <h3>Published Articles</h3>
            <div style={{ marginTop: '1rem' }}>
              {articles.length === 0 ? <p>No articles yet.</p> : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: '1rem 0' }}>Title</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map(a => (
                      <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '1rem 0' }}><strong>{a.title}</strong></td>
                        <td>{a.category}</td>
                        <td style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditArticle(a)} style={{ background: 'var(--teal-accent)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDeleteArticle(a.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

                {activeTab === 'social' && (
          <div className="admin-card">
            <h2>Social Media Links</h2>
            <p style={{ color: 'var(--steel-blue)', marginBottom: '2rem' }}>Enter your social media profile URLs. Leave blank to hide the icon on the website.</p>
            
            <form onSubmit={handleSaveSocials} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
              <div className="admin-form-group">
                <label>Facebook URL</label>
                <input type="url" placeholder="https://facebook.com/..." value={socialData.facebook || ''} onChange={e => setSocialData({...socialData, facebook: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Twitter / X URL</label>
                <input type="url" placeholder="https://x.com/..." value={socialData.twitter || ''} onChange={e => setSocialData({...socialData, twitter: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Instagram URL</label>
                <input type="url" placeholder="https://instagram.com/..." value={socialData.instagram || ''} onChange={e => setSocialData({...socialData, instagram: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>LinkedIn URL</label>
                <input type="url" placeholder="https://linkedin.com/in/..." value={socialData.linkedin || ''} onChange={e => setSocialData({...socialData, linkedin: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>TikTok URL</label>
                <input type="url" placeholder="https://tiktok.com/@..." value={socialData.tiktok || ''} onChange={e => setSocialData({...socialData, tiktok: e.target.value})} />
              </div>
                            <div className="admin-form-group">
                <label>Image URL (Optional)</label>
                <input type="url" placeholder="https://example.com/image.png" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              <button type="submit" className="admin-btn" disabled={loading}>{loading ? 'Saving...' : 'Save Social Links'}</button>
            </form>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="admin-card">
            <h2>Branding & Logo</h2>
            <p style={{ color: 'var(--steel-blue)', lineHeight: '1.6' }}>
              Your primary brand assets (logo, colors) are currently hardcoded into the website source code for maximum performance and reliability. 
              <br/><br/>
              To update the logo, simply replace the <code>logo_no_bg.png</code> file in the <code>public/assets/brand/</code> folder.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}



