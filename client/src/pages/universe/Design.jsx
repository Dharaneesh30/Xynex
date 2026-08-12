import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PivotControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, SSAO, Vignette } from '@react-three/postprocessing';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import { useCart } from '../../context/CartContext';
import catalogData from '../../data/catalog.json';
import FurnitureModel from '../../components/universe/FurnitureModel';

function PlacedItem({ item, position, isSelected, onSelect }) {
  return (
    <PivotControls
      anchor={[0, -1, 0]} // Anchor at bottom center
      depthTest={false}
      lineWidth={2}
      axisColors={['#0057FE', '#4A11C0', '#34D399']}
      visible={isSelected}
    >
      <group position={position} onPointerDown={(e) => { e.stopPropagation(); onSelect(); }}>
        <FurnitureModel item={item} />
      </group>
    </PivotControls>
  );
}

function RoomWalls({ width, length }) {
  const wallHeight = 2.5;

  // Real room wall paint (warm eggshell)
  const WallMaterial = () => (
    <meshPhysicalMaterial 
      color="#e8e6e1" 
      roughness={0.95} 
      metalness={0.0} 
      side={THREE.FrontSide} // FrontSide only creates the "Dollhouse" view effect
    />
  );

  return (
    <group>
      {/* Floor - Realistic Dark Hardwood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial 
          color="#2a221b" 
          roughness={0.85} 
          metalness={0.0} 
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, wallHeight/2, -length/2]} receiveShadow castShadow>
        <planeGeometry args={[width, wallHeight]} />
        <WallMaterial />
      </mesh>
      
      {/* Front Wall */}
      <mesh position={[0, wallHeight/2, length/2]} rotation={[0, Math.PI, 0]} receiveShadow castShadow>
        <planeGeometry args={[width, wallHeight]} />
        <WallMaterial />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-width/2, wallHeight/2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[length, wallHeight]} />
        <WallMaterial />
      </mesh>

      {/* Right Wall */}
      <mesh position={[width/2, wallHeight/2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[length, wallHeight]} />
        <WallMaterial />
      </mesh>
    </group>
  );
}

export default function Design() {
  const { addToCart, setDesignSnapshot } = useCart();
  const [roomDim, setRoomDim] = useState({ width: 5, length: 5 });
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const canvasRef = useRef();

  const categories = ['All', ...new Set(catalogData.map(item => item.category))];
  const filteredCatalog = activeCategory === 'All' ? catalogData : catalogData.filter(item => item.category === activeCategory);

  const handleAddToRoom = (product) => {
    const newId = Date.now() + Math.random();
    setPlacedItems(prev => [
      ...prev, 
      { 
        ...product, 
        instanceId: newId,
        position: [0, product.dimensions.height / 2, 0] // center floor
      }
    ]);
    setSelectedItemId(newId);
  };

  const calculateTotal = () => {
    return placedItems.reduce((sum, item) => sum + item.price, 0);
  };

  const captureSnapshot = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
      setDesignSnapshot(dataUrl);
      return dataUrl;
    }
    return null;
  };

  const handleSendQuery = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const snapshotUrl = captureSnapshot();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/design-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          image: snapshotUrl,
          items: placedItems
        })
      });

      if (res.ok) {
        alert("Your design query has been sent!");
        setIsQueryModalOpen(false);
      } else {
        alert("Failed to send query.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen pt-[72px]">
      
      {/* Left Panel: Settings */}
      <div className="w-full md:w-64 bg-surface border-r border-ink/5 p-6 overflow-y-auto flex-shrink-0 flex flex-col z-10">
        <h2 className="font-display font-semibold text-lg mb-6 text-ink">Room Setup</h2>
        
        <div className="space-y-4 mb-8">
          <Input 
            label="Width (meters)" 
            type="number" 
            value={roomDim.width} 
            onChange={e => setRoomDim(prev => ({...prev, width: Math.max(2, Number(e.target.value))}))}
            min="2" max="20" step="0.5"
          />
          <Input 
            label="Length (meters)" 
            type="number" 
            value={roomDim.length} 
            onChange={e => setRoomDim(prev => ({...prev, length: Math.max(2, Number(e.target.value))}))}
            min="2" max="20" step="0.5"
          />
        </div>

        <div className="mt-auto border-t border-ink/10 pt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-ink-muted">Items Placed</span>
            <span className="font-mono">{placedItems.length}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-ink-muted">Est. Cost</span>
            <span className="font-mono text-brand-blue font-medium">${calculateTotal().toLocaleString()}</span>
          </div>
          <Button 
            className="w-full mb-3" 
            variant="primary"
            onClick={() => {
              captureSnapshot();
              placedItems.forEach(item => addToCart(item));
              alert(`${placedItems.length} items added to cart!`);
            }}
            disabled={placedItems.length === 0}
          >
            Add Layout to Cart
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setIsQueryModalOpen(true)}
          >
            Ask about Design
          </Button>
        </div>
      </div>

      {/* Center Panel: 3D Canvas */}
      <div className="flex-grow flex relative bg-bg-base overflow-hidden">
        <Canvas 
          shadows 
          camera={{ position: [5, 5, 5], fov: 50 }} 
          gl={{ preserveDrawingBuffer: true, antialias: false }} 
          ref={canvasRef}
          onPointerMissed={() => setSelectedItemId(null)}
        >
          <color attach="background" args={['#020202']} />
          <ambientLight intensity={0.2} />
          
          {/* Key Light (warm studio) */}
          <directionalLight position={[10, 15, 10]} intensity={1.5} color="#fff1e0" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
          {/* Fill Light (cool studio) */}
          <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#e0f0ff" />
          
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <RoomWalls width={roomDim.width} length={roomDim.length} />

            {placedItems.map(item => (
              <PlacedItem 
                key={item.instanceId} 
                item={item} 
                position={item.position} 
                isSelected={selectedItemId === item.instanceId}
                onSelect={() => setSelectedItemId(item.instanceId)}
              />
            ))}

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.05} />
            
            <EffectComposer multisampling={4}>
              <SSAO radius={0.1} intensity={10} luminanceInfluence={0.5} color="black" />
              <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={0.2} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>

        {/* UI Overlay on Canvas */}
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
          <div className="bg-void/80 backdrop-blur px-3 py-1.5 rounded border border-ink/10 font-mono text-xs text-ink-muted pointer-events-auto">
            Design Studio — Live Mode
          </div>
          <Button variant="ghost" size="sm" className="pointer-events-auto" onClick={() => setPlacedItems([])}>
            Clear Room
          </Button>
        </div>
      </div>

      {/* Right Panel: Catalog */}
      <div className="w-full md:w-80 bg-surface border-l border-ink/5 p-6 overflow-y-auto flex-shrink-0 z-10 flex flex-col">
        <h2 className="font-display font-semibold text-lg mb-4 text-ink">Catalog</h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeCategory === cat 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-ink/5 text-ink hover:bg-ink/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4 flex-grow overflow-y-auto pr-2">
          {filteredCatalog.map(product => (
            <Card key={product.id} className="p-4 flex flex-col group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <span className="font-mono text-sm text-brand-blue">${product.price}</span>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }}></div>
                <span className="text-xs text-ink-muted">
                  {product.dimensions.width}m x {product.dimensions.depth}m x {product.dimensions.height}m
                </span>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => handleAddToRoom(product)}
                >
                  Place in Room
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-2"
                  onClick={() => { addToCart(product); alert('Added to cart'); }}
                  aria-label="Add to cart directly"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isQueryModalOpen} 
        onClose={() => setIsQueryModalOpen(false)}
        title="Ask About Your Design"
      >
        <form onSubmit={handleSendQuery} className="space-y-6">
          <p className="text-sm text-ink-muted mb-4">Send a snapshot of your room and the placed items to our design team for expert advice.</p>
          <Input label="Name" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <div>
            <label className="block text-sm font-medium mb-1">Your Question</label>
            <textarea name="message" className="w-full bg-surface border border-ink/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50" rows="4" required></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setIsQueryModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Send Query</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
