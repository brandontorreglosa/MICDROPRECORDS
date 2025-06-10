import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import ShoppingCartComponent from "./shopping-cart";
import logoImage from "@assets/freepik__enhance__16119_cropped.png";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { items } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const cartItemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <img 
                className="h-8 w-8 sm:h-10 sm:w-10" 
                src={logoImage} 
                alt="Mic Drop Records Logo"
              />
              <div 
                className="font-bold text-sm sm:text-lg text-white whitespace-nowrap" 
                style={{ fontFamily: '"Special Gothic Expanded One", sans-serif' }}
              >
                Mic Drop Records
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className={`transition-colors duration-200 font-medium ${
                  location === "/" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/releases" 
                className={`transition-colors duration-200 font-medium ${
                  location === "/releases" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                }`}
              >
                New Music
              </Link>
              <Link 
                href="/artists" 
                className={`transition-colors duration-200 font-medium ${
                  location.startsWith("/artist") ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Artists
              </Link>
              <Link 
                href="/studio" 
                className={`transition-colors duration-200 font-medium ${
                  location === "/studio" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Studio
              </Link>
              <Link 
                href="/news" 
                className={`transition-colors duration-200 font-medium ${
                  location === "/news" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                }`}
              >
                News
              </Link>
              <span className="text-gray-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer">
                Mic Drop +
              </span>
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <form onSubmit={handleSearch} className="flex">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search artists, albums..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pr-10 bg-gray-900 border-gray-600 focus:border-white text-white"
                      maxLength={50}
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      variant="ghost" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </form>
              </div>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* User Profile */}
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search artists, albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 bg-gray-900 border-gray-600 focus:border-white text-white"
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    variant="ghost" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link 
                  href="/" 
                  className={`block py-2 transition-colors duration-200 ${
                    location === "/" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/releases" 
                  className={`block py-2 transition-colors duration-200 ${
                    location === "/releases" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  New Music
                </Link>
                <Link 
                  href="/artists" 
                  className={`block py-2 transition-colors duration-200 ${
                    location.startsWith("/artist") ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Artists
                </Link>
                <Link 
                  href="/studio" 
                  className={`block py-2 transition-colors duration-200 ${
                    location === "/studio" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Studio
                </Link>
                <Link 
                  href="/news" 
                  className={`block py-2 transition-colors duration-200 ${
                    location === "/news" ? "text-white border-b border-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  News
                </Link>
                <span className="block py-2 text-gray-400 font-medium">Mic Drop +</span>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Shopping Cart Overlay */}
      <ShoppingCartComponent isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
