import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CornerFrame from '../components/common/CornerFrame';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FloatingLines from '../components/animations/FloatingLines';
import BlurReveal from '../components/animations/BlurReveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://xynex-ufsu.onrender.com';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: "Message received. I'll get back to you shortly." });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { 
      title: "LOCATION", 
      desc: "Based in Coimbatore Institute of Technology", 
      icon: <svg className="w-6 h-6 mb-3 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 
    },
    { 
      title: "PHONE", 
      desc: "+91 9489240892", 
      cta: "Call",
      link: "tel:+919489240892",
      icon: <svg className="w-6 h-6 mb-3 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> 
    },
    { 
      title: "EMAIL", 
      desc: "dharaneesh0530@gmail.com", 
      cta: "Email Me",
      link: "mailto:dharaneesh0530@gmail.com",
      icon: <svg className="w-6 h-6 mb-3 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> 
    },
    { 
      title: "CONNECT", 
      desc: "Find me online", 
      cta: "Social Profiles",
      isSocial: true,
      icon: <svg className="w-6 h-6 mb-3 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> 
    }
  ];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="fixed inset-0 z-[-1] bg-[#050507]">
        <FloatingLines linesGradient={['#050507', '#164E63', '#06B6D4', '#7C3AED']} className="opacity-30" />
      </div>
      
      {/* Hero Section */}
      <BlurReveal className="text-center mb-16 pt-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA] mb-6 uppercase">Let's Connect</p>
        <h1 className="text-4xl md:text-6xl font-display font-medium mb-6 text-[#F8FAFC] tracking-tight">Have Something in Mind?</h1>
        <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">Whether it's an idea, collaboration, project, or simply a conversation — I'd love to hear from you.</p>
      </BlurReveal>

      {/* Personal Contact Information */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {contactCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 bg-[rgba(13,13,20,0.6)] backdrop-blur-md border border-[#272333] rounded-2xl flex flex-col items-start"
          >
            {card.icon}
            <h3 className="font-semibold text-xs tracking-widest text-[#94A3B8] uppercase mb-1">{card.title}</h3>
            <p className="text-[#F8FAFC] text-sm leading-relaxed mb-4 flex-grow">{card.desc}</p>
            {card.isSocial ? (
              <div className="flex gap-2">
                <a href="https://github.com/Dharaneesh30" target="_blank" rel="noopener noreferrer" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">GitHub</a>
                <span className="text-[#272333]">|</span>
                <a href="https://linkedin.com/in/dharaneesh30" target="_blank" rel="noopener noreferrer" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">LinkedIn</a>
              </div>
            ) : card.cta ? (
              <a href={card.link} className="text-sm font-medium text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">{card.cta} →</a>
            ) : null}
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mb-24"
      >
        <CornerFrame className="bg-[rgba(13,13,20,0.8)] backdrop-blur-xl border border-[#272333] p-8 md:p-12 w-full rounded-[2rem] shadow-[0_0_30px_rgba(124,58,237,0.05)]">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-2 text-[#F8FAFC]">Start a Conversation.</h2>
            <p className="text-[#94A3B8]">Tell me what you're working on, what you're imagining, or what you'd like to build.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                required 
                placeholder="Jane Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="!bg-[#050507] !border-[#272333] focus:!border-[#7C3AED] focus:!ring-[#7C3AED] focus:!shadow-none"
              />
              <Input 
                label="Email Address" 
                type="email" 
                required 
                placeholder="jane@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="!bg-[#050507] !border-[#272333] focus:!border-[#7C3AED] focus:!ring-[#7C3AED] focus:!shadow-none"
              />
            </div>
            
            <Input 
              label="Subject" 
              required 
              placeholder="How can we collaborate?" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="!bg-[#050507] !border-[#272333] focus:!border-[#7C3AED] focus:!ring-[#7C3AED] focus:!shadow-none"
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full bg-[#050507] border border-[#272333] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-[#64748B] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-colors resize-none"
                placeholder="Share your thoughts..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            {status.message && (
              <div className={`p-4 rounded-lg border text-sm ${status.type === 'success' ? 'bg-[#7C3AED]/10 border-[#7C3AED]/20 text-[#A78BFA]' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {status.message}
              </div>
            )}

            <Button type="submit" size="lg" variant="primary" className="w-full md:w-auto font-semibold !bg-[#7C3AED] hover:!bg-[#8B5CF6] !border-none !text-white rounded-lg" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CornerFrame>
      </motion.div>

      {/* Personal Brand Statement */}
      <section className="mb-24 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-medium text-[#F8FAFC] mb-4">Let's Build Something Beyond.</h2>
        <p className="text-[#94A3B8] text-lg leading-relaxed">
          Good ideas deserve more than a place to exist. They deserve a space to become real.
        </p>
      </section>

      {/* CTA Section */}
      <section className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[rgba(13,13,20,0.5)] backdrop-blur-lg border border-[#272333] rounded-[32px] p-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-[#F8FAFC]">Have an idea worth exploring?</h2>
          <p className="text-[#94A3B8] text-lg mb-10">Let's take it beyond the ordinary.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} size="lg" className="!bg-[#06B6D4] hover:!bg-[#22D3EE] !text-[#050507] !border-none rounded font-semibold transition-all duration-300">
              Send a Message
            </Button>
            <Button to="/universe/showcase" variant="outline" size="lg" className="rounded font-semibold border border-[#272333] text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.05)] transition-all">
              Explore XYNEX
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
