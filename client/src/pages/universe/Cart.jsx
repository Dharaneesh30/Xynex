import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
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
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, customer, total })
      });

      if (res.ok) {
        // 2. Open WhatsApp to Owner with Order Info
        const ownerPhone = "919489240892";
        const itemsList = cartItems.map(i => `${i.qty}x ${i.name} ($${i.price * i.qty})`).join('%0A');
        const text = `Hello XYNEX! I just placed an order.%0A%0A*Customer:* ${customer.name}%0A*Address:* ${customer.address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Paid:* $${total.toLocaleString()}%0A%0APlease confirm my order!`;
        
        window.open(`https://wa.me/${ownerPhone}?text=${text}`, '_blank');

        setOrderComplete(true);
        clearCart();
      } else {
        alert("Something went wrong processing your order.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while placing order.");
    }
  };

  if (orderComplete) {
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
          <Button to="/universe" variant="primary">Return to Universe</Button>
        </div>
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
                onClick={() => setIsCheckoutOpen(true)}
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
          <Input label="Full Name" name="name" required placeholder="Jane Doe" />
          <Input label="Email Address" name="email" type="email" required placeholder="jane@example.com" />
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
