import React from 'react';
import { cn } from '@/lib/utils';

interface HandDrawnCardProps {
  children: React.ReactNode;
  className?: string;
}

const HandDrawnCard: React.FC<HandDrawnCardProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('hand-drawn-card', className)}>
      {children}
      <style jsx>{`
        .hand-drawn-card {
          position: relative;
          background: hsl(var(--card));
          border: 3px solid hsl(var(--primary));
          border-radius: 12px;
          box-shadow: 4px 4px 0 hsl(var(--primary) / 0.2);
        }
        .hand-drawn-card::before {
          content: '';
          position: absolute;
          inset: -3px;
          border: 3px solid hsl(var(--primary));
          border-radius: 12px;
          transform: rotate(-1deg);
          pointer-events: none;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default HandDrawnCard;
