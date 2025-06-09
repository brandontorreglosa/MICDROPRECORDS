import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AlbumCard from "@/components/album-card";
import { Play, ExternalLink, Instagram, Youtube } from "lucide-react";
import type { Artist, ReleaseWithArtist } from "@shared/schema";

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const artistId = parseInt(id || "0");

  const { data: artist, isLoading: artistLoading } = useQuery<Artist>({
    queryKey: [`/api/artists/${artistId}`],
    enabled: !!artistId,
  });

  const { data: releases = [], isLoading: releasesLoading } = useQuery<ReleaseWithArtist[]>({
    queryKey: [`/api/artists/${artistId}/releases`],
    enabled: !!artistId,
  });

  if (artistLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading artist...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <p className="text-gray-400">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0">
      {/* Artist Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600'} 
                alt={artist.name} 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
                  {artist.name}
                </h1>
                <p className="text-2xl text-purple-400 mb-6">{artist.genre}</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {artist.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Play className="mr-2 h-5 w-5" />
                  Play Latest
                </Button>
                
                {artist.spotifyUrl && (
                  <Button variant="outline" asChild>
                    <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Spotify
                    </a>
                  </Button>
                )}
                
                {artist.instagramUrl && (
                  <Button variant="outline" asChild>
                    <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </a>
                  </Button>
                )}
                
                {artist.youtubeUrl && (
                  <Button variant="outline" asChild>
                    <a href={artist.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 h-4 w-4" />
                      YouTube
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discography Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Discography</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>

          {releasesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
                  <div className="h-64 bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : releases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {releases.map((release) => (
                <AlbumCard key={release.id} release={release} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
              <p className="text-gray-400 text-lg">No releases available yet.</p>
              <p className="text-gray-500 mt-2">Check back soon for new music!</p>
            </Card>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-purple-500 mb-2">{releases.length}</div>
                <div className="text-gray-400">Releases</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-pink-500 mb-2">
                  {new Date(artist.createdAt || '').getFullYear()}
                </div>
                <div className="text-gray-400">Joined Mic Drop</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-cyan-500 mb-2">{artist.genre}</div>
                <div className="text-gray-400">Primary Genre</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
