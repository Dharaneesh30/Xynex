import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import showcaseData from '../../data/showcase.json';
import MorphSlider from '../../components/animations/MorphSlider';
import WebThreads from '../../components/animations/WebThreads';
import BlurReveal from '../../components/animations/BlurReveal';
import TiltedCard from '../../components/animations/TiltedCard';

export default function Showcase() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const calculateTotal = (products) => {
    return products.reduce((sum, p) => sum + (p.price * p.qty), 0);
  };

  const categories = ["ROOMS", "HUBS", "STUDIOS", "EXPERIMENTS"];

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="fixed inset-0 z-[-1] bg-[#050507]">
        <WebThreads color1="#312E81" color2="#7C3AED" color3="#A78BFA" opacity={0.25} />
      </div>

      {/* Hero Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center mb-32 pt-10">
        <BlurReveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA] mb-6 uppercase">
            THE UNIVERSE, CREATED
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium mb-8 text-[#F8FAFC] tracking-tight leading-[1.1]">
            Explore What Others Imagined.
          </h1>
          <p className="text-lg md:text-xl text-[#CBD5E1] max-w-3xl mx-auto mb-12 leading-relaxed font-body">
            Step into spaces created beyond conventional dimensions.
          </p>
        </BlurReveal>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
        >
          <Button onClick={() => window.scrollBy({ top: 500, behavior: 'smooth' })} variant="primary" size="lg" className="rounded-md w-full sm:w-auto font-semibold !bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none">
            Explore Designs
          </Button>
          <Button to="/universe/build" variant="ghost" size="lg" className="rounded-md w-full sm:w-auto font-semibold border border-[#272333] hover:bg-[rgba(255,255,255,0.05)] text-[#CBD5E1] hover:text-[#F8FAFC]">
            Build Your Own
          </Button>
        </motion.div>
      </section>

      {/* Slider */}
      <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.15)] relative mb-32 border border-[#272333]">
        <MorphSlider 
          items={showcaseData.map(room => ({ image: room.thumbnail, caption: room.title }))} 
          transition="melt"
          autoplay={true}
          autoplayDelay={4}
          overlayColor="#050507"
        />
      </div>

      {/* Featured Section */}
      <section className="mb-32">
        <BlurReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F8FAFC] mb-4">Every Creation Is a Dimension.</h2>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto mb-16">Explore rooms, hubs, environments, and experiments created within the XYNEX universe.</p>
          
          <h3 className="text-2xl md:text-3xl font-display font-medium text-[#F8FAFC] mb-4">Featured Dimensions</h3>
          <p className="text-[#94A3B8]">A collection of spaces worth stepping into.</p>
        </BlurReveal>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <span key={i} className="px-4 py-2 text-xs font-semibold tracking-wider text-[#94A3B8] border border-[#272333] rounded-full bg-[#0D0D14] hover:bg-[#12111A] hover:text-[#A78BFA] transition-colors cursor-default">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {showcaseData.slice(0, 3).map((room, i) => (
            <TiltedCard key={i} className="h-full">
              <Card 
                hoverable 
                className="h-full group cursor-pointer bg-[rgba(13,13,20,0.65)] backdrop-blur-md border-[#272333] hover:border-[#7C3AED] flex flex-col"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="aspect-video bg-[#050507] rounded-lg mb-4 overflow-hidden">
                  <img src={room.thumbnail} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-semibold tracking-widest text-[#06B6D4] uppercase mb-1 block">Category</span>
                  <h3 className="text-xl font-bold mb-2 text-[#F8FAFC] group-hover:text-[#A78BFA] transition-colors">{room.title}</h3>
                  <p className="text-[#94A3B8] text-sm line-clamp-2">{room.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#272333] flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Created recently</span>
                  <span className="text-sm font-medium text-[#A78BFA] group-hover:text-[#8B5CF6]">View Dimension</span>
                </div>
              </Card>
            </TiltedCard>
          ))}
        </div>

        {/* Latest Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-display font-medium text-[#F8FAFC] mb-4">Recently Created</h3>
          <p className="text-[#94A3B8]">See what's emerging across the XYNEX universe.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseData.slice(3).map((room, i) => (
            <TiltedCard key={i} className="h-full">
              <Card 
                hoverable 
                className="h-full group cursor-pointer bg-[rgba(13,13,20,0.65)] backdrop-blur-md border-[#272333] hover:border-[#7C3AED] flex flex-col"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="aspect-video bg-[#050507] rounded-lg mb-4 overflow-hidden">
                  <img src={room.thumbnail} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-semibold tracking-widest text-[#06B6D4] uppercase mb-1 block">Category</span>
                  <h3 className="text-xl font-bold mb-2 text-[#F8FAFC] group-hover:text-[#A78BFA] transition-colors">{room.title}</h3>
                  <p className="text-[#94A3B8] text-sm line-clamp-2">{room.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#272333] flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Created recently</span>
                  <span className="text-sm font-medium text-[#A78BFA] group-hover:text-[#8B5CF6]">View Dimension</span>
                </div>
              </Card>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[rgba(13,13,20,0.5)] backdrop-blur-lg border border-[#272333] rounded-[32px] p-16 md:p-24 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-[#F8FAFC]">Seen something that inspires you?</h2>
          <p className="text-[#94A3B8] text-lg mb-10">Create a dimension of your own.</p>
          <Button to="/universe/build" size="lg" className="!bg-[#06B6D4] hover:!bg-[#22D3EE] !text-[#050507] !border-none rounded font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            Start Building
          </Button>
        </motion.div>
      </section>

      <Modal 
        isOpen={!!selectedRoom} 
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom?.title}
      >
        {selectedRoom && (
          <div>
            <div className="aspect-video bg-[#0D0D14] rounded-lg mb-6 flex items-center justify-center border border-[#29223D] overflow-hidden">
              {selectedRoom.thumbnail ? (
                <img src={selectedRoom.thumbnail} alt={selectedRoom.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-[#94A3B8]">No Image Available</span>
              )}
            </div>
            <p className="text-[#CBD5E1] mb-6">{selectedRoom.description}</p>
            
            <h4 className="font-medium text-[#FFFFFF] mb-4 border-b border-[#272333] pb-2">Products Included</h4>
            <ul className="space-y-3 mb-6">
              {selectedRoom.products.map((product, i) => (
                <li key={i} className="flex justify-between items-center p-3 bg-[#0D0D14] rounded border border-[#29223D] hover:border-[#7C3AED] hover:shadow-[0_0_10px_rgba(124,58,237,0.18)] transition-all">
                  <div>
                    <span className="font-medium text-sm text-[#F8FAFC]">{product.name}</span>
                    <Badge variant="violet" className="ml-3 hidden sm:inline-flex">Qty: {product.qty}</Badge>
                  </div>
                  <span className="font-mono text-[#06B6D4] text-sm">${(product.price * product.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center justify-between bg-[#12111A] p-4 rounded-lg border border-[#29223D]">
              <span className="font-medium text-[#F8FAFC]">Total Estimate</span>
              <span className="font-mono text-xl font-bold text-[#7C3AED]">${calculateTotal(selectedRoom.products).toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>

    </main>
  );
}
