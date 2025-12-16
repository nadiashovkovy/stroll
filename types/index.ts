export interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  lat: number;
  lng: number;
  category: string;
  savedCount: number;
  description: string;
  comments: Comment[];
  savedBy: string[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isInfluencer: boolean;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  locationIds: string[];
  coverImage: string;
  isPrivate: boolean;
  userId: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}
