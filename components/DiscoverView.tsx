import { useState } from 'react';
import { Coffee, UtensilsCrossed, Palmtree, Camera } from 'lucide-react';
import { TrendingSpots } from './TrendingSpots';
import { LocationCard } from './LocationCard';
import type { Location } from '../types';

interface DiscoverViewProps {
  locations: Location[];
  savedLocationIds: string[];
  onSaveLocation: (id: string) => void;
  onLocationClick: (id: string) => void;
}

export function DiscoverView({ locations, savedLocationIds, onSaveLocation, onLocationClick }: DiscoverViewProps) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'restaurants', label: 'Food', icon: UtensilsCrossed },
    { id: 'cafes', label: 'Cafes', icon: Coffee },
    { id: 'nature', label: 'Nature', icon: Palmtree },
  ];

  const trending = locations.slice(0, 5);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <TrendingSpots locations={trending} onLocationClick={onLocationClick} />
      
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all active:scale-95 ${
                  filter === f.id
                    ? 'bg-[#5B6B9F] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-3">
            {locations.filter((_, i) => i % 2 === 0).map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onSave={onSaveLocation}
                isSaved={savedLocationIds.includes(location.id)}
                onClick={onLocationClick}
              />
            ))}
          </div>
          <div className="flex-1 space-y-3">
            {locations.filter((_, i) => i % 2 === 1).map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onSave={onSaveLocation}
                isSaved={savedLocationIds.includes(location.id)}
                onClick={onLocationClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
