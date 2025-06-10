import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ShoppingCart } from "lucide-react";
import { usePlayer } from "@/hooks/use-player";
import { useCart } from "@/hooks/use-cart";
import type { ReleaseWithArtist } from "@shared/schema";

interface AlbumCardProps {
  release: ReleaseWithArtist;
}

export default function AlbumCard({ release }: AlbumCardProps) {
  const { playTrack } = usePlayer();
  const { addToCart } = useCart();

  const handlePlay = () => {
    playTrack({
      id: release.id,
      title: release.title,
      artist: release.artist?.name || "Unknown Artist",
      image: release.image || '',
      duration: 180, // Default duration
      audioUrl: release.audioUrl || '',
    });
  };

  const handleAddToCart = () => {
    addToCart(release);
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden group album-hover cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={release.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'} 
          alt={release.title} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <Button 
            onClick={handlePlay}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2 text-white truncate">{release.title}</h3>
        <p className="text-gray-400 mb-4 truncate">{release.artist?.name || "Unknown Artist"}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-400">€{release.price}</span>
          <Button 
            onClick={handleAddToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
