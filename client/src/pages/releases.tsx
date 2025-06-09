import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AlbumCard from "@/components/album-card";
import { Search, Filter } from "lucide-react";
import type { ReleaseWithArtist } from "@shared/schema";

export default function Releases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data: releases = [], isLoading } = useQuery<ReleaseWithArtist[]>({
    queryKey: ["/api/releases"],
  });

  const genres = Array.from(new Set(releases.map(release => release.genre)));

  const filteredReleases = releases.filter(release => {
    const matchesSearch = !searchQuery || 
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !selectedGenre || release.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              All Releases
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our complete catalog of groundbreaking music from independent artists
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search releases or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 focus:border-purple-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="mb-8">
            <p className="text-gray-400">
              Showing {filteredReleases.length} of {releases.length} releases
              {selectedGenre && ` in ${selectedGenre}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => (
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
          ) : filteredReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredReleases.map((release) => (
                <AlbumCard key={release.id} release={release} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
              <p className="text-gray-400 text-lg mb-2">No releases found</p>
              <p className="text-gray-500">
                {searchQuery || selectedGenre 
                  ? "Try adjusting your search or filter criteria" 
                  : "Check back soon for new music!"
                }
              </p>
              {(searchQuery || selectedGenre) && (
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("");
                  }}
                  className="mt-4"
                  variant="outline"
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
