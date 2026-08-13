import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import NetworkConnections from '../../components/animations/NetworkConnections';

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
      const apiUrl = import.meta.env.VITE_API_URL || 'https://xynex-ufsu.onrender.com';
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

  if (loading || !user) return <div className="pt-32 text-center text-[#94A3B8]">Loading...</div>;

  // Calculate stats
  const totalOrders = orders.length;
  const itemsPlaced = orders.reduce((sum, order) => sum + (order.items?.length || 0), 0);

  return (
    <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative">
      <NetworkConnections color1="#312E81" color2="#164E63" color3="#0B1120" opacity={0.15} />
      
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgba(124,58,237,0.08)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[rgba(6,182,212,0.06)] rounded-full blur-[100px] pointer-events-none" />

      {/* Profile Hero Section */}
      <div className="relative z-10 bg-[rgba(13,13,20,0.65)] backdrop-blur-[16px] border border-[#272333] rounded-[20px] p-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover bg-[#FF4B4B]" />
            <div className="absolute inset-0 rounded-full shadow-[0_0_0_1px_rgba(124,58,237,0.45),0_0_25px_rgba(124,58,237,0.12)] pointer-events-none" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-[#F8FAFC] mb-1">{user.name}</h1>
            <p className="text-[#94A3B8] mb-2">{user.email}</p>
            <span className="text-xs font-medium text-[#A78BFA] bg-[#7C3AED]/10 px-2 py-1 rounded border border-[#7C3AED]/20">Account Member</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="px-6 py-2 rounded font-medium text-sm transition-all duration-300 border border-[#7C3AED] text-[#A78BFA] bg-transparent hover:bg-[rgba(124,58,237,0.12)] hover:border-[#8B5CF6] hover:text-[#FFFFFF]"
        >
          Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      {orders.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-4 mb-16">
          <div className="bg-[#12111A] border border-[#272333] rounded-lg px-6 py-4 min-w-[140px]">
            <p className="text-3xl font-bold text-[#F8FAFC]">{totalOrders}</p>
            <p className="text-sm font-medium text-[#94A3B8]"><span className="text-[#A78BFA]">Total</span> Orders</p>
          </div>
          <div className="bg-[#12111A] border border-[#272333] rounded-lg px-6 py-4 min-w-[140px]">
            <p className="text-3xl font-bold text-[#F8FAFC]">{itemsPlaced}</p>
            <p className="text-sm font-medium text-[#94A3B8]"><span className="text-[#A78BFA]">Items</span> Placed</p>
          </div>
        </div>
      )}

      {/* Archive Header */}
      <div className="relative z-10 mb-8">
        <h2 className="text-3xl font-display font-bold text-[#F8FAFC] mb-2">
          Your <span className="text-[#A78BFA]">Design Archive</span>
        </h2>
        <p className="text-[#94A3B8]">Your spaces, creations, and design journeys.</p>
      </div>
      
      <div className="relative z-10">
        {fetching ? (
          <p className="text-[#94A3B8]">Loading your archive...</p>
        ) : orders.length === 0 ? (
          <div className="bg-[rgba(13,13,20,0.55)] border border-[#272333] rounded-[24px] p-16 md:p-20 text-center flex flex-col items-center justify-center">
            <svg className="w-20 h-20 mb-8 opacity-75" viewBox="0 0 24 24" fill="none" stroke="url(#cube-gradient)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="cube-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">No designs yet</h3>
            <p className="text-[#94A3B8] mb-8">Your next space is waiting to be created.</p>
            <Button 
              to="/universe/design" 
              size="lg"
              className="!bg-[linear-gradient(135deg,#7C3AED,#06B6D4)] !text-[#FFFFFF] hover:!bg-[linear-gradient(135deg,#8B5CF6,#22D3EE)] hover:!shadow-[0_0_20px_rgba(124,58,237,0.25)] !border-none rounded font-medium transition-all duration-300"
            >
              Design a Room
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div key={order._id} className="bg-[#0D0D14] border border-[#272333] rounded-[18px] overflow-hidden group hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 flex flex-col">
                <div className="w-full h-[220px] relative overflow-hidden bg-[#08080C]">
                  {order.designSnapshot ? (
                    <img src={order.designSnapshot} alt="Room Design Snapshot" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[#64748B]">
                      No Snapshot
                    </div>
                  )}
                  {/* Subtle dark gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0D14] to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#F8FAFC] mb-1">Generated Design</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-[#A78BFA]">Room</p>
                      <span className="w-1 h-1 rounded-full bg-[#64748B]" />
                      <p className="text-sm text-[#94A3B8]">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20">
                      Completed
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      to={`/universe/showcase`}
                      className="w-full !bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none !shadow-none font-medium text-sm transition-colors duration-300"
                    >
                      View Design
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
