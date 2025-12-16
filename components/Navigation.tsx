import { Home, Map, FolderOpen, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'discover', icon: Home, label: 'Discover' },
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'boards', icon: FolderOpen, label: 'Boards' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex items-center justify-around h-16 px-2 bg-white border-t border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all active:scale-95"
          >
            <Icon 
              className={`w-6 h-6 ${isActive ? 'text-[#5B6B9F]' : 'text-gray-500'}`}
            />
            <span className={`text-xs ${isActive ? 'text-[#5B6B9F]' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
