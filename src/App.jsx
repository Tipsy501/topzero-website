import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Businesses from './pages/Businesses';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Legal from './pages/Legal';
import Innovation from './pages/Innovation';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />`n                <Route path="/news/:id" element={<NewsDetail />} />`n                <Route path="/innovation" element={<Innovation />} />`n                <Route path="/privacy" element={<Legal />} />
                <Route path="/terms" element={<Legal />} />
                <Route path="*" element={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}><h2>Page coming soon</h2></div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;



