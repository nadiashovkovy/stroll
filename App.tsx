import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DiscoverView } from './components/DiscoverView';
import { MapView } from './components/MapView';
import { BoardsView } from './components/BoardsView';
import { ProfileView } from './components/ProfileView';
import { LocationDetailModal } from './components/LocationDetailModal';
import { locations as mockLocations, boards as mockBoards, currentUser } from './data/mockData';
import type { Location, Board } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [locations] = useState<Location[]>(mockLocations);
  const [boards] = useState<Board[]>(mockBoards);
  const [savedLocationIds, setSavedLocationIds] = useState<string[]>([
    'loc-1', 'loc-2', 'loc-3', 'loc-4', 'loc-5'
  ]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const selectedLocation = selectedLocationId
    ? locations.find((loc) => loc.id === selectedLocationId) ?? null
    : null;

  const handleSaveLocation = (locationId: string) => {
    setSavedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleLocationClick = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  const handleAddLocation = () => {
    console.log('Add location');
  };

  const handleBoardClick = (boardId: string) => {
    console.log('Board clicked:', boardId);
  };

  const handleCreateBoard = () => {
    console.log('Create board');
  };

  return (
    <div className="flex flex-col h-screen max-w-[430px] mx-auto bg-white overflow-hidden">
      <Header onAddLocation={handleAddLocation} showSearch={activeTab !== 'map'} />
      
      <div className="flex-1 overflow-hidden">
        {activeTab === 'discover' && (
          <DiscoverView
            locations={locations}
            savedLocationIds={savedLocationIds}
            onSaveLocation={handleSaveLocation}
            onLocationClick={handleLocationClick}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            locations={locations}
            onLocationClick={handleLocationClick}
          />
        )}

        {activeTab === 'boards' && (
          <BoardsView
            boards={boards}
            locations={locations}
            onBoardClick={handleBoardClick}
            onCreateBoard={handleCreateBoard}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={currentUser}
            locations={locations}
            savedLocationIds={savedLocationIds}
            onLocationClick={handleLocationClick}
          />
        )}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <LocationDetailModal
        location={selectedLocation}
        isSaved={selectedLocationId ? savedLocationIds.includes(selectedLocationId) : false}
        onClose={() => setSelectedLocationId(null)}
        onSave={handleSaveLocation}
      />
    </div>
  );
}
