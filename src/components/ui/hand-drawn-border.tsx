import React from 'react';
import { cn } from '@/lib/utils';

interface HandDrawnBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'input' | 'button';
}

const HandDrawnBorder: React.FC<HandDrawnBorderProps> = ({
  children,
  className = '',
  variant = 'card'
}) => {
  const baseStyles = "relative bg-transparent";

  const variantStyles = {
    card: "p-6 border-[3px] border-primary rounded-xl shadow-[4px_4px_0_hsl(var(--primary)_/_0.15)]",
    input: "border-[2px] border-input rounded-lg",
    button: "border-[3px] border-primary rounded-xl shadow-[3px_3px_0_hsl(var(--primary)_/_0.2)]"
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </div>
  );
};

export default HandDrawnBorder;
