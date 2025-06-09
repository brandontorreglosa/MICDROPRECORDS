import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/use-player";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  X,
  Heart
} from "lucide-react";

export default function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    isVisible,
    progress,
    volume,
    isMuted,
    togglePlay,
    nextTrack,
    previousTrack,
    setProgress,
    setVolume,
    toggleMute,
    closePlayer
  } = usePlayer();

  const [isLiked, setIsLiked] = useState(false);

  if (!isVisible || !currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 z-30">
      <Card className="bg-gray-800/95 backdrop-blur-md border-gray-700 shadow-2xl">
        <div className="p-4">
          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <img 
                src={currentTrack.image || ''} 
                alt={currentTrack.title} 
                className="w-12 h-12 rounded-lg shadow-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">{currentTrack.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : "text-gray-400"}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-3 mx-8">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={previousTrack} className="text-gray-400 hover:text-white">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                onClick={togglePlay}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={nextTrack} className="text-gray-400 hover:text-white">
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress & Volume */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xs">
              <span className="text-gray-400 text-sm font-mono min-w-[40px]">
                {formatTime(progress)}
              </span>
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  onValueChange={(value) => setProgress(value[0])}
                  max={currentTrack.duration || 180}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-gray-400 text-sm font-mono min-w-[40px]">
                {formatTime(currentTrack.duration || 180)}
              </span>
            </div>

            {/* Volume & Close */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-gray-400 hover:text-white hidden md:flex"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-24 hidden md:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePlayer}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden mt-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-400 text-xs font-mono">
                {formatTime(progress)}
              </span>
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  onValueChange={(value) => setProgress(value[0])}
                  max={currentTrack.duration || 180}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-gray-400 text-xs font-mono">
                {formatTime(currentTrack.duration || 180)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
