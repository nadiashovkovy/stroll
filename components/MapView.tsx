import { MapPin } from 'lucide-react';
import type { Location } from '../types';

interface MapViewProps {
  locations: Location[];
  onLocationClick: (id: string) => void;
}

export function MapView({ locations, onLocationClick }: MapViewProps) {
  return (
    <div className="h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center px-8">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="">Map View</h2>
        <p className="text-sm text-gray-600 mt-2">
          Interactive map coming soon
        </p>
        <p className="text-sm text-[#5B6B9F] mt-4">
          {locations.length} locations saved
        </p>
      </div>
    </div>
  );
}
