import { TrendingUp, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Location } from '../types';

interface TrendingSpotsProps {
  locations: Location[];
  onLocationClick: (id: string) => void;
}

export function TrendingSpots({ locations, onLocationClick }: TrendingSpotsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <TrendingUp className="w-5 h-5 text-[#5B6B9F]" />
        <h2 className="">Trending Now</h2>
      </div>
      
      <div className="overflow-x-auto px-4 scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => onLocationClick(location.id)}
              className="flex-shrink-0 w-56 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md mb-2">
                <ImageWithFallback
                  src={location.image}
                  alt={location.name}
                  className="w-56 h-36 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm text-white mb-0.5 line-clamp-1">{location.name}</h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-white" />
                    <p className="text-xs text-white/90">{location.city}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {location.savedCount.toLocaleString()} saves
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
