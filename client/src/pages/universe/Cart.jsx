import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, designSnapshot } = useCart();
  const { user, token } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = {
      name: formData.get('name'),
      email: formData.get('email'),
      address: formData.get('address')
    };

    try {
      // 1. Send Order to Backend (Emails invoice to customer and owner)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ items: cartItems, address: customer.address, total, designImage: designSnapshot })
      });

      if (res.ok) {
        setOrderComplete(true);
        clearCart();
        setIsCheckoutOpen(false);
        // Prompt for review after a short delay
        setTimeout(() => setReviewModalOpen(true), 1500);
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.error || 'Something went wrong processing your order.'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error while placing order.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: reviewRating, text: reviewText })
      });
      if (res.ok) {
        alert('Thank you for your feedback!');
        setReviewModalOpen(false);
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (orderComplete) {
    const ownerPhone = "919489240892";
    const text = `Hello XYNEX! I just placed an order and would like to confirm its status.`;
    return (
      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-status-good/10 text-status-good rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Order Confirmed</h1>
          <p className="text-ink-muted mb-8">
            Thank you for your order. Your invoice has been generated and your items are being prepared for dispatch.
          </p>
          <div className="flex flex-col gap-4">
            <a 
              href={`https://wa.me/${ownerPhone}?text=${text}`}
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-[#25D366] text-white py-3 px-4 rounded font-medium hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
            <Button to="/universe" variant="outline">Return to Universe</Button>
          </div>
        </div>

        <Modal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} title="How was your experience?">
          <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Rate your experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button" onClick={() => setReviewRating(star)} className={`text-2xl ${reviewRating >= star ? 'text-brand-violet' : 'text-ink/20'}`}>★</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-ink">Your Feedback</label>
              <textarea 
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="w-full bg-surface border border-ink/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-blue" 
                rows="4" 
                required
                placeholder="Tell us what you loved..."
              ></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full">Submit Review</Button>
          </form>
        </Modal>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-12">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-lg border border-ink/5">
          <p className="text-xl text-ink-muted mb-6">Your cart is currently empty.</p>
          <div className="flex justify-center gap-4">
            <Button to="/universe/showcase" variant="secondary">Browse Showcase</Button>
            <Button to="/universe/design" variant="primary">Open Design Studio</Button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-ink-muted">Unit Price: ${item.price}</p>
                </div>
                
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-3 bg-surface-elevated rounded p-1 border border-ink/10">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-mono">{item.qty}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface rounded transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="w-20 text-right font-mono font-medium text-brand-blue">
                    ${(item.price * item.qty).toLocaleString()}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-ink-muted hover:text-red-500 transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="font-display font-semibold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Subtotal</span>
                  <span className="font-mono">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">GST (18%)</span>
                  <span className="font-mono">${gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Shipping</span>
                  <span className="font-mono text-status-good">Free</span>
                </div>
              </div>
              
              <div className="border-t border-ink/10 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">Total</span>
                  <span className="font-mono font-bold text-2xl text-brand-violet-light">${total.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full" 
                onClick={() => {
                  if (!user) {
                    alert("Please log in to checkout.");
                  } else {
                    setIsCheckoutOpen(true);
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>

        </div>
      )}

      <Modal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        title="Checkout Details"
      >
        <form onSubmit={handleCheckout} className="space-y-6">
          <Input label="Shipping Address" name="address" required placeholder="123 Xynex Ave, City, Country" />
          
          <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Confirm Order</Button>
          </div>
        </form>
      </Modal>

    </main>
  );
}
