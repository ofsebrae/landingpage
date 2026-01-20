
import React, { useState, useMemo, useEffect } from 'react';
import { Category, ProductType } from './types';
import { PRICING_CONFIG } from './constants';
import ThreeScene from './components/ThreeScene';
import Configurator from './components/Configurator';
import LeadModal from './components/LeadModal';
import Header from './components/Header';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(ProductType.CONSTRUIDO_9M2);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ASSOCIADA);
  const [area, setArea] = useState<number>(9);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculatedPrice = useMemo(() => {
    const config = PRICING_CONFIG.products[selectedProduct];
    const basePrice = selectedCategory === Category.ASSOCIADA ? config.associated : config.nonAssociated;
    
    if (selectedProduct === ProductType.APENAS_PISO) {
      return basePrice * area;
    }
    return basePrice;
  }, [selectedProduct, selectedCategory, area]);

  const resetView = () => {
    // Handled by key in ThreeScene component to force remount or internal ref access
    window.location.reload(); // Simple approach for reset
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col lg:flex-row p-4 lg:p-8 gap-8 max-w-7xl mx-auto w-full">
        {/* Mobile Title Section */}
        <div className="lg:hidden space-y-4">
          <h1 className="text-3xl font-black uppercase leading-tight tracking-tighter">
            Configure seu <br />
            <span className="text-lime-400">Stand FIEB INDEX</span>
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-lime-400 text-blue-950 font-black rounded-full text-xl shadow-lg hover:bg-lime-300 transition-colors uppercase tracking-widest"
          >
            Quero ser expositor
          </button>
        </div>

        {/* 3D View Column */}
        <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] bg-slate-900/40 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
          <ThreeScene productType={selectedProduct} area={area} />
          
          <div className="absolute top-4 left-4 z-10">
             <button 
              onClick={resetView}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/20 hover:bg-white/20 transition-all uppercase"
             >
               Resetar Visão
             </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 text-xs text-white/50 text-center pointer-events-none">
            Utilize o mouse ou toque para girar e aproximar
          </div>
        </div>

        {/* Pricing & Config Column */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="hidden lg:block space-y-2">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tighter">
              Configure seu <br />
              <span className="text-lime-400">Stand INDEX</span>
            </h1>
          </div>

          <Configurator 
            product={selectedProduct} 
            setProduct={setSelectedProduct}
            category={selectedCategory}
            setCategory={setSelectedCategory}
            area={area}
            setArea={setArea}
            price={calculatedPrice}
          />

          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden lg:block w-full py-6 bg-lime-400 text-blue-950 font-black rounded-full text-2xl shadow-xl hover:scale-105 transition-transform uppercase tracking-widest"
          >
            Quero ser expositor
          </button>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-xs text-white/60 leading-relaxed italic">
              {PRICING_CONFIG.observation}
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 p-4 bg-blue-950/80 backdrop-blur-md border-t border-white/10 z-50">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 bg-lime-400 text-blue-950 font-black rounded-full text-lg shadow-lg uppercase"
        >
          Quero ser expositor
        </button>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        category={selectedCategory}
        area={area}
        totalPrice={calculatedPrice}
      />

      <footer className="py-8 text-center text-white/30 text-xs">
        &copy; {new Date().getFullYear()} INDEX Stands - Desenvolvido para FIEB
      </footer>
    </div>
  );
};

export default App;
