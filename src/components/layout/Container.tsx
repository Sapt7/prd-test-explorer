
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  withGradientBorder?: boolean;
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  maxWidth = 'full',
  withGradientBorder = false
}) => {
  return (
    <div 
      className={cn(
        'w-full mx-auto px-4 sm:px-6',
        maxWidthClasses[maxWidth],
        withGradientBorder && 'p-[1px] rounded-lg bg-gradient-to-r from-blue-400 to-teal-300',
        className
      )}
    >
      {withGradientBorder ? (
        <div className="w-full h-full bg-background rounded-lg p-4">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Container;
