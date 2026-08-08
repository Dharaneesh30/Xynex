import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { CartProvider } from './context/CartContext';
import { useReducedMotion } from './hooks/useReducedMotion';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Universe from './pages/universe/Universe';
import Showcase from './pages/universe/Showcase';
import Design from './pages/universe/Design';
import Cart from './pages/universe/Cart';
import NotFound from './pages/NotFound';

function PageTransition({ children }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/universe/showcase" element={<Showcase />} />
          <Route path="/universe/design" element={<Design />} />
          <Route path="/universe/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
