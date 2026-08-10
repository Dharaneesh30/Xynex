import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user, token, logout, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (token && user) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      fetch(`${apiUrl}/api/orders/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(console.error)
      .finally(() => setFetching(false));
    }
  }, [token, user]);

  if (loading || !user) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-ink/10" />
          <div>
            <h1 className="text-3xl font-display font-bold">{user.name}</h1>
            <p className="text-ink-muted">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>

      <h2 className="text-2xl font-display font-bold mb-6">Your Past Designs & Orders</h2>
      
      {fetching ? (
        <p className="text-ink-muted">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <Card className="p-8 text-center text-ink-muted">
          <p className="mb-4">You haven't placed any orders yet.</p>
          <Button to="/universe/design" variant="primary">Design a Room</Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {orders.map(order => (
            <Card key={order._id} className="overflow-hidden flex flex-col">
              {order.designSnapshot ? (
                <div className="w-full h-48 bg-void border-b border-ink/5 relative group">
                  <img src={order.designSnapshot} alt="Room Design Snapshot" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium text-sm">Room Design</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-16 bg-surface-elevated border-b border-ink/5 flex items-center justify-center text-sm text-ink-muted">
                  No Snapshot
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-ink-muted mb-1">Order Date</p>
                    <p className="font-medium text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-muted mb-1">Total Paid</p>
                    <p className="font-mono text-brand-blue font-bold">${order.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-ink-muted mb-2">Furniture Bought:</p>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="text-sm flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="text-ink-muted font-mono">${item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
