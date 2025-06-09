import { Link, useLocation } from "wouter";
import { Home, Heart, Menu, User } from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 md:hidden">
      <div className="grid grid-cols-4 gap-1 py-2">
        <Link 
          href="/"
          className={`flex flex-col items-center py-3 px-2 transition-colors duration-200 ${
            location === "/" ? "text-purple-500" : "text-gray-400 hover:text-purple-500"
          }`}
        >
          <Heart className="h-5 w-5 mb-1" />
          <span className="text-xs">Favorites</span>
        </Link>

        <Link 
          href="/"
          className={`flex flex-col items-center py-3 px-2 transition-colors duration-200 ${
            location === "/" ? "text-purple-500" : "text-gray-400 hover:text-purple-500"
          }`}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-xs">Home</span>
        </Link>

        <button className="flex flex-col items-center py-3 px-2 text-gray-400 hover:text-purple-500 transition-colors duration-200">
          <Menu className="h-5 w-5 mb-1" />
          <span className="text-xs">Menu</span>
        </button>

        <button className="flex flex-col items-center py-3 px-2 text-gray-400 hover:text-purple-500 transition-colors duration-200">
          <User className="h-5 w-5 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
