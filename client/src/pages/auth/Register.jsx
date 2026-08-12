import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import GradientWaves from '../../components/animations/GradientWaves';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.error || 'Failed to register');
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative">
      <GradientWaves />
      <Card className="w-full max-w-md p-8 relative z-10">
        <h1 className="text-3xl font-display font-bold mb-6 text-center">Create Account</h1>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input 
            label="Full Name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
            minLength={6}
          />
          <Button type="submit" variant="gradient" className="w-full mt-4">Sign Up</Button>
        </form>
        
        <p className="text-center text-sm text-ink-muted dark:text-slate-400">
          Already have an account? <Link to="/login" className="text-brand-blue dark:text-brand-violet-light hover:underline">Log in</Link>
        </p>
      </Card>
    </main>
  );
}
