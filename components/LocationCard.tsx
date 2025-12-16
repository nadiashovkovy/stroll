import { MapPin, Heart, MessageCircle, Bookmark } from 'lucide-react';
import type { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onSave: (id: string) => void;
  isSaved: boolean;
  onClick: (id: string) => void;
}

export function LocationCard({ location, onSave, isSaved, onClick }: LocationCardProps) {
  return (
    <div
      onClick={() => onClick(location.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
    >
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(location.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform active:scale-95"
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? 'text-[#5B6B9F] fill-[#5B6B9F]' : 'text-gray-700'}`}
          />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="mb-1 line-clamp-1">{location.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <p className="text-xs text-gray-600 line-clamp-1">
            {location.city}, {location.country}
          </p>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {location.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">
                {location.savedCount > 999 
                  ? `${(location.savedCount / 1000).toFixed(1)}k` 
                  : location.savedCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">{location.comments.length}</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 px-2 py-0.5 bg-gray-50 rounded-full">
            {location.category}
          </span>
        </div>
      </div>
    </div>
  );
}
