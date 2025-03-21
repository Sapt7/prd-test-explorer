import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "w-full py-4 px-6 flex items-center justify-between border-b border-border",
        "bg-background/80 backdrop-blur-lg sticky top-0 z-50",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-teal-300 flex items-center justify-center">
          <span className="text-primary-foreground text-lg font-semibold">
            Q
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">
            Test Case Genie
          </h1>
          <div className="flex gap-1 items-end">
            <h4 className="text-2xs">by</h4>
            <h3 className="text-xs font-semibold tracking-tight">
              🧑🏾‍💻 Zero-Bugs-Given 🐞 🚫
            </h3>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-muted-foreground">
          SDET Toolkit
        </div>
      </div>
    </header>
  );
};

export default Header;
