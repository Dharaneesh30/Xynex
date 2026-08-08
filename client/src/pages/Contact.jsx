import React, { useState } from 'react';
import CornerFrame from '../components/common/CornerFrame';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Your message has been sent successfully. We will be in touch shortly.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's build your space.</h1>
        <p className="text-lg text-ink-muted">
          Whether you have questions about our Design Studio, enterprise deployments, or just want to chat about the future of interior design, we're here to listen.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Contact Form */}
        <CornerFrame className="bg-surface p-8 md:p-12 w-full">
          <h2 className="text-2xl font-display font-semibold mb-8 text-ink">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Full Name" 
              required 
              placeholder="Jane Doe" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <Input 
              label="Email Address" 
              type="email" 
              required 
              placeholder="jane@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-ink-muted mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full bg-surface-elevated border border-ink/10 rounded px-4 py-3 text-ink placeholder-ink-muted/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors resize-none"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            {status.message && (
              <div className={`p-4 rounded border text-sm ${status.type === 'success' ? 'bg-status-good/10 border-status-good/20 text-status-good' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {status.message}
              </div>
            )}

            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CornerFrame>

        {/* Contact Info & Office */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-ink">Our Office</h3>
            <Card className="p-6">
              <div className="aspect-video bg-surface-elevated rounded mb-6 flex items-center justify-center border border-ink/5 overflow-hidden group">
                <div className="text-brand-blue/30 group-hover:scale-110 transition-transform duration-700">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
              </div>
              <p className="font-medium mb-1">Xynex Headquarters</p>
              <p className="text-ink-muted text-sm leading-relaxed mb-4">
                123 Design Avenue<br/>
                Innovation District<br/>
                San Francisco, CA 94103
              </p>
              <div className="space-y-2 text-sm text-ink-muted">
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  hello@xynex.com
                </p>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </main>
  );
}
