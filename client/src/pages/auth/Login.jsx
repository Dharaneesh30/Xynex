import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import GradientWaves from '../../components/animations/GradientWaves';
import BlurReveal from '../../components/animations/BlurReveal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      if (res.user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setError(res.error || 'Failed to login');
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative z-10">
      <div className="fixed inset-0 z-[-1] bg-[#050507]">
        <GradientWaves color1="#050507" color2="#164E63" color3="#06B6D4" color4="#7C3AED" className="opacity-40" />
      </div>

      <div className="w-full max-w-md bg-[rgba(13,13,20,0.6)] backdrop-blur-xl border border-[#272333] p-10 rounded-[24px] shadow-[0_0_40px_rgba(124,58,237,0.1)] relative z-10">
        <BlurReveal>
          <h1 className="text-3xl font-display font-medium mb-2 text-center text-[#F8FAFC] tracking-wide">Access the Universe</h1>
          <p className="text-[#94A3B8] text-center mb-8">Enter your credentials to continue.</p>
        </BlurReveal>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="!bg-[#050507] !border-[#272333] focus:!border-[#7C3AED] focus:!ring-[#7C3AED]"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="!bg-[#050507] !border-[#272333] focus:!border-[#7C3AED] focus:!ring-[#7C3AED]"
          />
          <Button type="submit" variant="primary" className="w-full mt-4 !bg-[#7C3AED] hover:!bg-[#8B5CF6] !text-[#FFFFFF] !border-none font-medium py-3 rounded-lg">Log In</Button>
        </form>
        
        <p className="text-center text-sm text-[#94A3B8]">
          Don't have an account? <Link to="/register" className="text-[#06B6D4] hover:text-[#22D3EE] font-medium transition-colors">Register here</Link>
        </p>
      </div>
    </main>
  );
}
