import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { PlayerProvider } from "@/hooks/use-player";
import Header from "@/components/header";
import MobileNav from "@/components/mobile-nav";
import MusicPlayer from "@/components/music-player";
import Home from "@/pages/home";
import Artist from "@/pages/artist";
import Releases from "@/pages/releases";
import Studio from "@/pages/studio";
import News from "@/pages/news";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/artist/:id" component={Artist} />
      <Route path="/releases" component={Releases} />
      <Route path="/studio" component={Studio} />
      <Route path="/news" component={News} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <PlayerProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="pb-32">
                <Router />
              </main>
              <MusicPlayer />
              <MobileNav />
              <Toaster />
            </div>
          </PlayerProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
