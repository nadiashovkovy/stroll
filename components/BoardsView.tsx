import { Plus, Lock, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Board, Location } from '../types';

interface BoardsViewProps {
  boards: Board[];
  locations: Location[];
  onBoardClick: (id: string) => void;
  onCreateBoard: () => void;
}

export function BoardsView({ boards, locations, onBoardClick, onCreateBoard }: BoardsViewProps) {
  const getLocationCount = (board: Board) => board.locationIds.length;
  
  const getFirstLocation = (board: Board) => {
    const firstId = board.locationIds[0];
    return locations.find(loc => loc.id === firstId);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="flex items-center justify-between px-4 pt-4 pb-6">
        <div>
          <h1 className="">My Boards</h1>
          <p className="text-sm text-gray-600">Organize your saved locations</p>
        </div>
        <button
          onClick={onCreateBoard}
          className="flex items-center gap-2 px-4 py-2 bg-[#5B6B9F] text-white rounded-full hover:bg-[#4A5A8E] transition-colors active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create</span>
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-3">
            {/* Create new board card */}
            <div
              onClick={onCreateBoard}
              className="bg-white border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden cursor-pointer hover:border-gray-400 transition-colors active:scale-95"
            >
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center">
                <Plus className="w-10 h-10 text-gray-400" />
              </div>
              <div className="p-3">
                <h3 className="text-center text-gray-600">Create New</h3>
              </div>
            </div>

            {boards.filter((_, i) => i % 2 === 0).map((board) => {
              const firstLocation = getFirstLocation(board);
              return (
                <div
                  key={board.id}
                  onClick={() => onBoardClick(board.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] bg-gray-200">
                    {firstLocation ? (
                      <>
                        <ImageWithFallback
                          src={firstLocation.image}
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Plus className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {board.isPrivate ? (
                        <Lock className="w-4 h-4 text-white drop-shadow-lg" />
                      ) : (
                        <Globe className="w-4 h-4 text-white drop-shadow-lg" />
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs text-white drop-shadow-lg">
                        {getLocationCount(board)} {getLocationCount(board) === 1 ? 'place' : 'places'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="mb-1 line-clamp-1">{board.name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {board.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 space-y-3">
            {boards.filter((_, i) => i % 2 === 1).map((board) => {
              const firstLocation = getFirstLocation(board);
              return (
                <div
                  key={board.id}
                  onClick={() => onBoardClick(board.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] bg-gray-200">
                    {firstLocation ? (
                      <>
                        <ImageWithFallback
                          src={firstLocation.image}
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Plus className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {board.isPrivate ? (
                        <Lock className="w-4 h-4 text-white drop-shadow-lg" />
                      ) : (
                        <Globe className="w-4 h-4 text-white drop-shadow-lg" />
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs text-white drop-shadow-lg">
                        {getLocationCount(board)} {getLocationCount(board) === 1 ? 'place' : 'places'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="mb-1 line-clamp-1">{board.name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {board.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
