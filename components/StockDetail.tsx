import React from 'react';
import { StockAnalysis } from '../types';
import { NeonButton } from './NeonButton';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: StockAnalysis;
  onBack: () => void;
}

// Generate some dummy chart data based on trend for visualization
const generateChartData = (trend: string) => {
  const data = [];
  let val = 100;
  for (let i = 0; i < 20; i++) {
    const change = trend === 'UP' ? Math.random() * 5 : trend === 'DOWN' ? Math.random() * -5 : (Math.random() - 0.5) * 5;
    val += change;
    data.push({ name: `T-${20-i}`, value: val });
  }
  return data;
};

export const StockDetail: React.FC<Props> = ({ data, onBack }) => {
  const isUp = data.trendDirection === 'UP' || data.signal === 'CALL';
  const colorClass = isUp ? 'text-neon-green' : 'text-neon-red';
  const shadowClass = isUp ? 'shadow-neon-green' : 'shadow-neon-red';
  const chartColor = isUp ? '#0aff00' : '#ff0000';
  const chartData = generateChartData(data.trendDirection);

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto p-4 pb-20">
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-neon-card/80 border border-neon-blue/30 p-4 rounded-lg backdrop-blur-md sticky top-4 z-20 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
        <NeonButton onClick={onBack} variant="blue" className="text-sm">
           ← BACK
        </NeonButton>
        <div className="text-right">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white font-bold tracking-wider">{data.name}</h1>
          <p className="font-rajdhani text-neon-blue text-lg tracking-widest">{data.symbol}</p>
        </div>
      </div>

      {/* Main Signal Display */}
      <div className={`relative bg-black/40 border-2 ${isUp ? 'border-neon-green' : 'border-neon-red'} rounded-xl p-8 text-center overflow-hidden group`}>
        <div className={`absolute inset-0 opacity-10 ${isUp ? 'bg-neon-green' : 'bg-neon-red'}`}></div>
        
        <h2 className="text-gray-400 font-rajdhani uppercase tracking-widest text-sm mb-2">AI Prediction Engine</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          
          <div className="text-center">
            <p className="text-gray-300 font-rajdhani">Current Price</p>
            <p className="font-orbitron text-4xl md:text-5xl text-white mt-1">{data.currentPrice}</p>
            <p className={`font-mono text-lg mt-2 ${colorClass}`}>
              {data.changePercent}
            </p>
          </div>

          <div className="w-px h-20 bg-gray-700 hidden md:block"></div>

          <div className="text-center animate-pulse">
            <p className="text-gray-300 font-rajdhani">Signal</p>
            <h1 className={`font-orbitron text-6xl md:text-7xl font-black ${colorClass} drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
              {data.signal}
            </h1>
            <p className="text-white font-rajdhani mt-2 text-xl">
              Confidence: <span className="text-neon-blue font-bold">{data.confidence}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Analysis & Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Reasoning */}
        <div className="bg-neon-card/50 border border-neon-blue/30 p-6 rounded-lg">
          <h3 className="font-orbitron text-neon-blue text-xl mb-4 border-b border-neon-blue/30 pb-2">Analysis</h3>
          <p className="font-rajdhani text-gray-200 text-lg leading-relaxed">
            {data.reasoning}
          </p>
          {data.predictedTarget && (
            <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
              <span className="text-gray-400 font-rajdhani block text-sm">Target Prediction</span>
              <span className="font-orbitron text-xl text-neon-pink">{data.predictedTarget}</span>
            </div>
          )}
        </div>

        {/* Chart Visualization */}
        <div className="bg-neon-card/50 border border-neon-blue/30 p-6 rounded-lg h-[300px]">
          <h3 className="font-orbitron text-neon-blue text-xl mb-4">Trend Visualizer</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050510', borderColor: chartColor }}
                itemStyle={{ color: chartColor }}
              />
              <Area type="monotone" dataKey="value" stroke={chartColor} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-neon-card/50 border border-neon-pink/30 p-6 rounded-lg">
        <h3 className="font-orbitron text-neon-pink text-xl mb-6 flex items-center gap-2">
          <span>LIVE INTELLIGENCE</span>
          <span className="inline-block w-2 h-2 bg-neon-pink rounded-full animate-ping"></span>
        </h3>
        <div className="space-y-4">
          {data.news.map((item, idx) => (
            <div key={idx} className="group border-l-2 border-neon-blue/30 hover:border-neon-pink pl-4 py-2 transition-all duration-300">
              <h4 className="font-rajdhani font-bold text-white text-lg group-hover:text-neon-pink transition-colors">
                {item.title}
              </h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-500 text-sm font-orbitron">{item.source}</span>
              </div>
            </div>
          ))}
          {data.news.length === 0 && (
            <p className="text-gray-500 italic">No recent news signals detected.</p>
          )}
        </div>
      </div>

      <div className="text-center pt-8 pb-4">
         <p className="text-gray-600 text-xs font-rajdhani uppercase tracking-widest">
           Disclaimer: Himanshu Market You AI predictions are for educational purposes. 
           Markets are volatile. Invest responsibly.
         </p>
      </div>
    </div>
  );
};