
import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-4 px-6 flex items-center justify-between border-b border-border",
      "bg-background/80 backdrop-blur-lg sticky top-0 z-50",
      className
    )}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-teal-300 flex items-center justify-center">
          <span className="text-primary-foreground text-lg font-semibold">Q</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          QA Automation
        </h1>
      </div>
      
      <Tabs defaultValue="knowledge" className="w-auto">
        <TabsList className="h-9 p-0 bg-transparent">
          <TabsTrigger 
            value="about" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative px-4"
          >
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center bg-gray-200 text-gray-500 w-6 h-6 rounded-full text-sm">1</span>
              About
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="knowledge" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative px-4"
          >
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center bg-blue-400 text-white w-6 h-6 rounded-full text-sm">2</span>
              Knowledge
            </span>
            {/* Active indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-300 rounded-t-full"></div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-muted-foreground">
          SDET Toolkit
        </div>
      </div>
    </header>
  );
};

export default Header;
