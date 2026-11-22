import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'general', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Write to Firestore
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', type: 'general', message: '' });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Whether you want to partner with us or just say hello, we'd love to hear from you.</p>
      </section>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Our team is based in Gaborone, Botswana, and operates globally.</p>
          
          <div className="contact-detail">
            <h4>Email</h4>
            <a href="mailto:topogabolekwe@gmail.com">topogabolekwe@gmail.com</a>
          </div>
          <div className="contact-detail">
            <h4>Location</h4>
            <p style={{ margin: 0, color: 'var(--steel-blue)' }}>Gaborone, Botswana</p>
          </div>
          <div className="contact-detail">
            <h4>Facebook</h4>
            <a href="https://www.facebook.com/profile.php?id=61596398626972" target="_blank" rel="noreferrer">Visit our Page</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          
          {status === 'success' && <div className="success-msg">Message sent successfully! We will get back to you soon.</div>}
          {status === 'error' && <div className="success-msg" style={{ background: '#f8d7da', color: '#721c24' }}>Failed to send message. Please try again.</div>}

          <div className="form-group">
            <label>Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Enquiry Type</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="general">General Enquiry</option>
              <option value="partnership">Business Partnership</option>
              <option value="support">App Support</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          </div>
          
          <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
