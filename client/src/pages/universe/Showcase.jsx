import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import showcaseData from '../../data/showcase.json';

export default function Showcase() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const calculateTotal = (products) => {
    return products.reduce((sum, p) => sum + (p.price * p.qty), 0);
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Showcase</h1>
          <p className="text-lg text-ink-muted max-w-2xl">
            Explore curated room designs. Discover layouts that inspire your next project.
          </p>
        </div>
        <Button to="/universe/design" variant="outline" className="hidden md:flex">
          Build Your Own
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcaseData.map((room) => (
          <Card 
            key={room.id} 
            hoverable 
            className="cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedRoom(room)}
          >
            <div className="aspect-video bg-surface-elevated relative border-b border-ink/5 flex items-center justify-center overflow-hidden">
              {room.thumbnail ? (
                <img src={room.thumbnail} alt={room.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-brand-blue/20">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display font-semibold text-lg mb-2">{room.title}</h3>
              <p className="text-sm text-ink-muted mb-4 flex-grow">{room.description}</p>
              <div className="flex items-center justify-between border-t border-ink/5 pt-4 mt-auto">
                <span className="text-sm text-ink-muted font-mono">{room.products.length} Items</span>
                <span className="font-medium text-brand-blue font-mono">${calculateTotal(room.products).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
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
