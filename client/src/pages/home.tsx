import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AlbumCard from "@/components/album-card";
import ArtistCard from "@/components/artist-card";
import { Play, ChevronDown } from "lucide-react";
import type { ReleaseWithArtist, Artist, News } from "@shared/schema";

export default function Home() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const { data: featuredReleases = [] } = useQuery<ReleaseWithArtist[]>({
    queryKey: ["/api/releases/featured"],
  });

  const { data: featuredArtists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists/featured"],
  });

  const { data: featuredNews = [] } = useQuery<News[]>({
    queryKey: ["/api/news/featured"],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoadingScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 animate-pulse text-white">
            Mic Drop Records
          </div>
          <div className="w-16 h-1 bg-yellow-500 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-purple-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-white">Underground</span>
              <br />
              <span className="text-yellow-500">Talent</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Independent artists. Cutting-edge sound. Raw talent meets professional production at Mic Drop Records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Listen Now
              </Button>
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-6 text-lg">
                Explore Artists
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">New Releases</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredReleases.map((release) => (
              <AlbumCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Artists</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Studio</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              State-of-the-art recording facilities where creativity meets cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Studio Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Professional recording studio" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Recording booth" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Music production setup" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Studio control room" 
                className="rounded-2xl shadow-lg album-hover"
              />
            </div>

            {/* Studio Information */}
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-500">
                    Professional Recording
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our main recording room features industry-standard equipment including Neumann microphones, 
                    SSL mixing console, and pristine acoustics designed by award-winning studio architects.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-500">
                    Mixing & Mastering
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    State-of-the-art mixing suite with surround sound monitoring, analog outboard gear, 
                    and the latest digital audio workstations for pristine sound quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-pink-500">
                    Artist Support
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our experienced engineers and producers work closely with artists to bring their 
                    vision to life, providing technical expertise and creative guidance throughout the process.
                  </p>
                </CardContent>
              </Card>

              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full py-6 text-lg">
                Book Studio Time
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest News</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((article) => (
              <Card key={article.id} className="bg-gray-800/50 border-gray-700 overflow-hidden album-hover">
                <img 
                  src={article.image || ''} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="text-yellow-500 text-sm mb-2">
                    {new Date(article.publishedAt || '').toLocaleDateString()}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{article.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <Button variant="link" className="text-purple-500 hover:text-purple-400 p-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3">
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gray-800/50 border-gray-700 shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-purple-500">Mic Drop</span>
                <span className="text-yellow-500 mx-4">X</span>
                <span className="text-cyan-500">2610 ATH</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Exclusive partnership bringing Athens underground scene to the global stage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3">
                  Explore Partnership
                </Button>
                <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black px-8 py-3">
                  Contact 2610 ATH
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
