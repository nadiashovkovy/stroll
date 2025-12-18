import { X, MapPin, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Location } from '../types';

interface LocationDetailModalProps {
  location: Location | null;
  isSaved: boolean;
  onClose: () => void;
  onSave: (id: string) => void;
}

export function LocationDetailModal({ location, isSaved, onClose, onSave }: LocationDetailModalProps) {
  if (!location) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl w-full max-w-[430px] max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-200">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />
          <h2 className="mt-2">{location.name}</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Image */}
          <ImageWithFallback
            src={location.image}
            alt={location.name}
            className="w-full h-80 object-cover"
          />

          {/* Content */}
          <div className="p-4">
            {/* Location info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">
                  {location.city}, {location.country}
                </p>
              </div>
              <span className="inline-block text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {location.category}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{location.savedCount.toLocaleString()} saves</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{location.comments.length} comments</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="mb-2">About this place</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{location.description}</p>
            </div>

            {/* Comments */}
            {location.comments.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-3">Comments</h3>
                {location.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 mb-3">
                    <ImageWithFallback
                      src={comment.avatar}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm">{comment.username}</span>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pb-2">
              <button
                onClick={() => onSave(location.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-[#5B6B9F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`}
                />
                <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors active:scale-95 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
