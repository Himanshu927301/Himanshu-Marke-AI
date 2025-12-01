import React from 'react';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'blue' | 'pink' | 'green' | 'red';
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const NeonButton: React.FC<Props> = ({ onClick, children, variant = 'blue', className = '', type = 'button' }) => {
  const colors = {
    blue: 'border-neon-blue text-neon-blue hover:bg-neon-blue/10 shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]',
    pink: 'border-neon-pink text-neon-pink hover:bg-neon-pink/10 shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]',
    green: 'border-neon-green text-neon-green hover:bg-neon-green/10 shadow-[0_0_10px_rgba(10,255,0,0.3)] hover:shadow-[0_0_20px_rgba(10,255,0,0.6)]',
    red: 'border-neon-red text-neon-red hover:bg-neon-red/10 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-orbitron px-6 py-2 border-2 rounded-md transition-all duration-300 tracking-wider uppercase font-bold ${colors[variant]} ${className}`}
    >
      {children}
    </button>
  );
};