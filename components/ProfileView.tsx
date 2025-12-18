import { useState } from 'react';
import { Settings, Grid3x3, Bookmark, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Location } from '../types';

interface ProfileViewProps {
  user: User;
  locations: Location[];
  savedLocationIds: string[];
  onLocationClick: (locationId: string) => void;
}

export function ProfileView({ user, locations, savedLocationIds, onLocationClick }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  
  const savedLocations = locations.filter(loc => savedLocationIds.includes(loc.id));
  const myLocations = locations.filter(loc => loc.savedBy.includes(user.id)).slice(0, 6);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Profile Header */}
      <div className="px-4 pt-6 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="mb-0.5">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.username}</p>
              {user.isInfluencer && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                  ✨ Influencer
                </span>
              )}
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-4">{user.bio}</p>

        <div className="flex gap-6 mb-4">
          <div>
            <div className="text-center">
              <div className="text-sm">{savedLocationIds.length}</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
          </div>
          <div>
            <div className="text-center">
              <div className="text-sm">{user.followers.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Followers</div>
            </div>
          </div>
          <div>
            <div className="text-center">
              <div className="text-sm">{user.following.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Following</div>
            </div>
          </div>
        </div>

        <button className="w-full py-2.5 bg-[#5B6B9F] text-white rounded-full hover:bg-[#4A5A8E] transition-colors active:scale-[0.98]">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 transition-all active:scale-95 ${
            activeTab === 'posts'
              ? 'text-[#5B6B9F] border-b-2 border-[#5B6B9F]'
              : 'text-gray-500'
          }`}
        >
          <Grid3x3 className="w-4 h-4" />
          <span className="text-sm">Posts</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 transition-all active:scale-95 ${
            activeTab === 'saved'
              ? 'text-[#5B6B9F] border-b-2 border-[#5B6B9F]'
              : 'text-gray-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-sm">Saved</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="p-4">
        {activeTab === 'posts' ? (
          myLocations.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {myLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => onLocationClick(location.id)}
                  className="aspect-square relative rounded-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
                >
                  <ImageWithFallback
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-[11px] text-white line-clamp-1">{location.name}</p>
                    <div className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                      <p className="text-[9px] text-white/90">{location.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Grid3x3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No posts yet</p>
            </div>
          )
        ) : (
          savedLocations.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {savedLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => onLocationClick(location.id)}
                  className="aspect-square relative rounded-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
                >
                  <ImageWithFallback
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-[11px] text-white line-clamp-1">{location.name}</p>
                    <div className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                      <p className="text-[9px] text-white/90">{location.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No saved locations yet</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
