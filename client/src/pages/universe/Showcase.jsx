import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import showcaseData from '../../data/showcase.json';
import MorphSlider from '../../components/animations/MorphSlider';
import MoltenMetal from '../../components/animations/MoltenMetal';

export default function Showcase() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const calculateTotal = (products) => {
    return products.reduce((sum, p) => sum + (p.price * p.qty), 0);
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative">
      <MoltenMetal color1="#06070C" color2="#4A11C0" color3="#0057FE" opacity={0.6} />
      <div className="mb-12 flex flex-col items-center text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Showcase</h1>
        <p className="text-lg text-ink-muted mb-2">
          Explore curated room designs. Discover layouts that inspire your next project.
        </p>
      </div>

      <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl relative mb-16 border border-ink/10">
        <MorphSlider 
          items={showcaseData.map(room => ({ image: room.thumbnail, caption: room.title }))} 
          transition="melt"
          autoplay={true}
          autoplayDelay={4}
          overlayColor="#0F1119"
        />
      </div>

      <div className="flex justify-center mb-24">
        <Button to="/universe/design" variant="primary" size="lg" className="px-12 py-4 text-lg shadow-elevated">
          Build Your Own
        </Button>
      </div>

      <Modal 
        isOpen={!!selectedRoom} 
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom?.title}
      >
        {selectedRoom && (
          <div>
            <div className="aspect-video bg-surface rounded-lg mb-6 flex items-center justify-center border border-ink/5">
              {selectedRoom.thumbnail ? (
                <img src={selectedRoom.thumbnail} alt={selectedRoom.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-ink-muted">No Image Available</span>
              )}
            </div>
            <p className="text-ink-muted mb-6">{selectedRoom.description}</p>
            
            <h4 className="font-medium text-ink mb-4 border-b border-ink/10 pb-2">Products Included</h4>
            <ul className="space-y-3 mb-6">
              {selectedRoom.products.map((product, i) => (
                <li key={i} className="flex justify-between items-center p-3 bg-surface rounded border border-ink/5">
                  <div>
                    <span className="font-medium text-sm">{product.name}</span>
                    <Badge variant="default" className="ml-3 hidden sm:inline-flex">Qty: {product.qty}</Badge>
                  </div>
                  <span className="font-mono text-brand-blue text-sm">${(product.price * product.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center justify-between bg-surface-elevated p-4 rounded-lg border border-ink/10">
              <span className="font-medium">Total Estimate</span>
              <span className="font-mono text-xl font-bold text-brand-violet-light">${calculateTotal(selectedRoom.products).toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>

    </main>
  );
}
