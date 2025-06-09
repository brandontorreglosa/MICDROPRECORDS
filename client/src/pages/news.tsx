import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { News } from "@shared/schema";

export default function NewsPage() {
  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const featuredNews = news.filter(article => article.featured);
  const regularNews = news.filter(article => !article.featured);

  return (
    <div className="pt-0">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Latest News
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest happenings in the Mic Drop Records universe
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Stories</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.slice(0, 2).map((article) => (
                <Card key={article.id} className="bg-gray-800/50 border-gray-700 overflow-hidden album-hover">
                  <img 
                    src={article.image || ''} 
                    alt={article.title} 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishedAt || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        <span>{article.category}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">{article.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                    <Button variant="link" className="text-purple-500 hover:text-purple-400 p-0">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">All Stories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-yellow-500"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700 animate-pulse">
                  <div className="h-48 bg-gray-700"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-6 bg-gray-700 rounded mb-3"></div>
                    <div className="h-16 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <Card key={article.id} className="bg-gray-800/50 border-gray-700 overflow-hidden album-hover">
                  <img 
                    src={article.image || ''} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishedAt || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          article.category === 'Events' ? 'bg-purple-900 text-purple-300' :
                          article.category === 'Studio' ? 'bg-pink-900 text-pink-300' :
                          'bg-cyan-900 text-cyan-300'
                        }`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 leading-tight">{article.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Button variant="link" className="text-purple-500 hover:text-purple-400 p-0 text-sm">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800/50 border-gray-700 p-12 text-center">
              <p className="text-gray-400 text-lg">No news articles available yet.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </Card>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-xl text-gray-300 mb-8">
                Subscribe to our newsletter for the latest news, releases, and exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
