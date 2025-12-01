import React, { useState } from 'react';
import { analyzeStock } from './services/geminiService';
import { StockAnalysis, StockPreview } from './types';
import { NeonButton } from './components/NeonButton';
import { StockDetail } from './components/StockDetail';

// Default big companies for quick access
const DEFAULT_STOCKS: StockPreview[] = [
  { symbol: 'HDB', name: 'HDFC Bank' },
  { symbol: 'RELIANCE', name: 'Reliance Ind' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSM', name: 'TSMC' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'TCS', name: 'TCS' },
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      // If user typed a generic name, the AI in analyzeStock will handle searching for the ticker
      const result = await analyzeStock(query);
      setSelectedStock(result);
    } catch (err) {
      setError('Failed to analyze stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white selection:bg-neon-pink selection:text-white font-sans">
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Glowing Orb */}
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-blue rounded-full blur-[120px] opacity-10 z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Navbar */}
        <nav className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-pink drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] text-center">
            HIMANSHU MARKET YOU
          </h1>
          <p className="mt-2 text-neon-blue font-rajdhani tracking-[0.3em] uppercase text-sm md:text-base">
            Robot Stock Market Intelligence
          </p>
        </nav>

        {loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-neon-blue/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-neon-blue border-r-neon-pink rounded-full animate-spin"></div>
            </div>
            <p className="mt-8 font-orbitron text-xl animate-pulse text-neon-blue">
              ANALYZING GLOBAL MARKET DATA...
            </p>
            <p className="mt-2 font-rajdhani text-gray-400">Scanning News & Indicators</p>
          </div>
        ) : selectedStock ? (
          // Detail View
          <StockDetail 
            data={selectedStock} 
            onBack={() => {
              setSelectedStock(null);
              setSearchQuery('');
            }} 
          />
        ) : (
          // Home / Search View
          <div className="max-w-5xl mx-auto animate-fade-in">
            
            {/* Search Bar */}
            <div className="flex gap-4 mb-16 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="SEARCH ANY COMPANY (e.g. Tata Motors, Nvidia)..."
                className="flex-1 bg-neon-card/80 border-2 border-neon-blue/50 rounded-lg px-6 py-4 text-white font-orbitron placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] transition-all"
              />
              <NeonButton 
                onClick={() => handleSearch(searchQuery)} 
                variant="pink"
                className="hidden md:block"
              >
                ANALYZE
              </NeonButton>
            </div>

            {error && (
              <div className="text-neon-red text-center mb-8 font-bold border border-neon-red/50 p-4 rounded bg-neon-red/10">
                {error}
              </div>
            )}

            {/* Quick Access Grid */}
            <div className="space-y-4">
              <h2 className="font-rajdhani text-2xl text-white border-l-4 border-neon-blue pl-4">
                MARKET GIANTS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {DEFAULT_STOCKS.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleSearch(stock.name)}
                    className="group relative overflow-hidden bg-neon-card border border-gray-800 hover:border-neon-green p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,255,0,0.3)] text-left"
                  >
                    <div className="relative z-10">
                      <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-neon-green transition-colors">
                        {stock.symbol}
                      </h3>
                      <p className="font-rajdhani text-gray-400 text-sm">{stock.name}</p>
                    </div>
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 to-neon-green/0 group-hover:from-neon-green/5 group-hover:to-transparent transition-all duration-500"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* World Search Info */}
            <div className="mt-20 text-center border-t border-gray-800 pt-8">
               <h3 className="text-neon-pink font-orbitron text-xl mb-2">WORLD WIDE ACCESS</h3>
               <p className="text-gray-400 font-rajdhani max-w-xl mx-auto">
                 Search for any company in the world. Our Robot will scan global news, real-time prices, and technical indicators to provide a prediction with up to 99% computed confidence.
               </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;