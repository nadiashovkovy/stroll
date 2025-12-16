import { Search, Plus, Bell } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  onAddLocation: () => void;
  showSearch?: boolean;
}

export function Header({ onAddLocation, showSearch = true }: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <ImageWithFallback 
          src="/stroll-logo.svg"
          alt="Stroll"
          className="h-10 w-auto object-contain"
        />
      </div>
      
      <div className="flex items-center gap-2">
        {showSearch && (
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <button 
          onClick={onAddLocation}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
