import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";
import { usePlayer } from "@/hooks/use-player";
import type { Artist } from "@shared/schema";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { playTrack } = usePlayer();

  const handlePlay = () => {
    // Play a sample track or the artist's latest release
    playTrack({
      id: artist.id,
      title: `${artist.name} - Sample Track`,
      artist: artist.name,
      image: artist.image || '',
      duration: 180,
      audioUrl: '', // Would be populated with actual audio URL
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden group album-hover">
      <div className="relative p-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
        <div className="bg-gray-800 rounded-2xl p-6 h-full">
          <div className="text-center">
            <div className="relative mb-4">
              <img 
                src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'} 
                alt={artist.name} 
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-transparent group-hover:ring-purple-500 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                <Button 
                  onClick={handlePlay}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2"
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{artist.name}</h3>
            <p className="text-purple-400 mb-3 font-medium">{artist.genre}</p>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {artist.bio || `Talented ${artist.genre.toLowerCase()} artist bringing fresh sounds to the music scene.`}
            </p>
            
            <div className="flex justify-center space-x-3 mb-4">
              {artist.spotifyUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-purple-500 hover:text-purple-400"
                >
                  <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.599-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.66.18 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.481.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </Button>
              )}
              
              {artist.instagramUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-pink-500 hover:text-pink-400"
                >
                  <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </Button>
              )}
              
              {artist.youtubeUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-cyan-500 hover:text-cyan-400"
                >
                  <a href={artist.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </Button>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link href={`/artist/${artist.id}`}>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </Link>
              
              <Button 
                onClick={handlePlay}
                variant="outline" 
                className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                size="sm"
              >
                <Play className="mr-2 h-4 w-4" />
                Play Sample
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
