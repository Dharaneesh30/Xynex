import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import GradientWaves from '../../components/animations/GradientWaves';

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
    <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative">
      <GradientWaves />
      <Card className="w-full max-w-md p-8 relative z-10">
        <h1 className="text-3xl font-display font-bold mb-6 text-center">Welcome Back</h1>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" variant="gradient" className="w-full mt-4">Log In</Button>
        </form>
        
        <p className="text-center text-sm text-ink-muted dark:text-slate-400">
          Don't have an account? <Link to="/register" className="text-brand-blue dark:text-brand-violet-light hover:underline">Register here</Link>
        </p>
      </Card>
    </main>
  );
}
