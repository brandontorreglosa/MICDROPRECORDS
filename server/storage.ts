import { users, artists, releases, news, cart, type User, type InsertUser, type Artist, type InsertArtist, type Release, type InsertRelease, type News, type InsertNews, type Cart, type InsertCart, type ReleaseWithArtist } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Artists
  getArtists(): Promise<Artist[]>;
  getFeaturedArtists(): Promise<Artist[]>;
  getArtist(id: number): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  searchArtists(query: string): Promise<Artist[]>;

  // Releases
  getReleases(): Promise<ReleaseWithArtist[]>;
  getFeaturedReleases(): Promise<ReleaseWithArtist[]>;
  getRelease(id: number): Promise<ReleaseWithArtist | undefined>;
  getReleasesByArtist(artistId: number): Promise<ReleaseWithArtist[]>;
  createRelease(release: InsertRelease): Promise<Release>;
  searchReleases(query: string): Promise<ReleaseWithArtist[]>;

  // News
  getNews(): Promise<News[]>;
  getFeaturedNews(): Promise<News[]>;
  getNewsArticle(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;

  // Cart
  getCartItems(sessionId: string): Promise<(Cart & { release: ReleaseWithArtist })[]>;
  addToCart(item: InsertCart): Promise<Cart>;
  removeFromCart(sessionId: string, releaseId: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private artists: Map<number, Artist>;
  private releases: Map<number, Release>;
  private news: Map<number, News>;
  private cart: Map<string, Cart[]>;
  private currentUserId: number;
  private currentArtistId: number;
  private currentReleaseId: number;
  private currentNewsId: number;
  private currentCartId: number;

  constructor() {
    this.users = new Map();
    this.artists = new Map();
    this.releases = new Map();
    this.news = new Map();
    this.cart = new Map();
    this.currentUserId = 1;
    this.currentArtistId = 1;
    this.currentReleaseId = 1;
    this.currentNewsId = 1;
    this.currentCartId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed artists
    const artistsData: InsertArtist[] = [
      {
        name: "XAP",
        bio: "A rising star from Greece, known for his talent and voice. an inspirational artist well known for his work.",
        genre: "Drill / Trap",
        image: "https://audio.com/s3w/audio.com.static/audio/image/78/50/1833011070245078-1833085425532691.jpeg@256?qlt=75",
        spotifyUrl: "https://spotify.com/artist/xap",
        instagramUrl: "https://instagram.com/officialxap",
        youtubeUrl: "https://youtube.com/officialxap",
        featured: true,
      },
      {
        name: "Whibla",
        bio: "Experimental rapper with crazy vocals, inspired by Yolte. Name comes from black and white.",
        genre: "Rap / Trap",
        image: "https://instagram.fath7-1.fna.fbcdn.net/v/t51.2885-15/474582091_18358916557193193_6862765889546226719_n.webp?efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fath7-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QE8rLLXlDU7i4nFkv14UP6RcZBzAbKl0PeDiBYAzFC83XtNV2RefAG067zjVIoov6s&_nc_ohc=M0H5mFFtnx0Q7kNvwF0dQqs&_nc_gid=ssNP0Ks76ZQnbzu0WlZQ1w&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzU1MTE5MjYzNDgxNjA0NTAwMg%3D%3D.3-ccb7-5&oh=00_AfPU_yXMcjmqe7czMrAxpb6qi6m594_XM1Zm11JkbUO7VQ&oe=684D4D26&_nc_sid=7a9f4b",
        spotifyUrl: "https://open.spotify.com/artist/1HsVxvW9T1spyv9VZU7HqR",
        instagramUrl: "https://www.instagram.com/whibla537/",
        youtubeUrl: "https://www.youtube.com/@Whibla537",
        featured: true,
      },
      {
        name: "Marcus \"Flow\" Johnson",
        bio: "Street poet turned chart-topper, known for his conscious rap and community activism.",
        genre: "Hip-Hop",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        spotifyUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
        featured: true,
      },
      {
        name: "Neon Satellites",
        bio: "Four-piece indie rock band blending nostalgic melodies with modern production techniques.",
        genre: "Indie Rock",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        spotifyUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
        featured: true,
      },
      {
        name: "Sophia Chen",
        bio: "Virtuoso saxophonist bridging traditional jazz with contemporary R&B and neo-soul influences.",
        genre: "Contemporary Jazz",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        spotifyUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
        featured: true,
      },
      {
        name: "River Stone",
        bio: "Singer-songwriter crafting intimate stories through acoustic melodies and poetic lyricism.",
        genre: "Indie Folk",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        spotifyUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
        featured: true,
      },
    ];

    artistsData.forEach(artist => {
      this.createArtist(artist);
    });

    // Seed releases
    const releasesData: InsertRelease[] = [
      {
        title: "Rich Laugh",
        artistId: 2, // Whibla
        genre: "Rap / Trap",
        price: "15.00",
        image: "https://i.scdn.co/image/ab67616d0000b2738e8acec5179a5e63c1c72b91",
        audioUrl: "https://example.com/audio/neon-nights.mp3",
        description: "Will not stop until i achieve that rich laugh.",
        featured: true,
      },
      {
        title: "Electric Dreams",
        artistId: 4, // Neon Satellites
        genre: "Indie Rock",
        price: "28.00",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "Street Poetry",
        artistId: 3, // Marcus Johnson
        genre: "Hip-Hop",
        price: "24.00",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "Midnight Jazz",
        artistId: 5, // Sophia Chen
        genre: "Jazz",
        price: "30.00",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "Forest Echoes",
        artistId: 6, // River Stone
        genre: "Folk",
        price: "26.00",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "W",
        artistId: 2, // Whibla
        genre: "Rap / Trap",
        price: "20.00",
        image: "https://i.scdn.co/image/ab67616d0000b27384ec1deb585c2034a749ef6e",
        featured: true,
      },
      {
        title: "Pablo Esco",
        artistId: 1, // XAP
        genre: "Drill / Trap",
        price: "20.00",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "Rebel Hearts",
        artistId: 4, // Neon Satellites
        genre: "Rock",
        price: "29.00",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
    ];

    releasesData.forEach(release => {
      this.createRelease(release);
    });

    // Seed news
    const newsData: InsertNews[] = [
      {
        title: "Summer Festival Lineup Announced",
        content: "Mic Drop Records artists headline three major summer festivals, bringing underground sounds to mainstream audiences.",
        excerpt: "Mic Drop Records artists headline three major summer festivals, bringing underground sounds to mainstream audiences.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Events",
        featured: true,
      },
      {
        title: "New Collaboration Album in Progress",
        content: "Echo Valley and XAP team up for an experimental cross-genre album set to release in early 2025.",
        excerpt: "Echo Valley and XAP team up for an experimental cross-genre album set to release in early 2025.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Studio",
        featured: true,
      },
      {
        title: "Studio Upgrade Complete",
        content: "Our recording facility receives major equipment upgrades, including new analog synthesizers and mixing board.",
        excerpt: "Our recording facility receives major equipment upgrades, including new analog synthesizers and mixing board.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Studio",
        featured: true,
      },
    ];

    newsData.forEach(article => {
      this.createNews(article);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Artist methods
  async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getFeaturedArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values()).filter(artist => artist.featured);
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = this.currentArtistId++;
    const artist: Artist = { 
      ...insertArtist, 
      id, 
      createdAt: new Date(),
    };
    this.artists.set(id, artist);
    return artist;
  }

  async searchArtists(query: string): Promise<Artist[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.artists.values()).filter(artist =>
      artist.name.toLowerCase().includes(lowerQuery) ||
      artist.genre.toLowerCase().includes(lowerQuery)
    );
  }

  // Release methods
  async getReleases(): Promise<ReleaseWithArtist[]> {
    const releases = Array.from(this.releases.values());
    return releases.map(release => ({
      ...release,
      artist: this.artists.get(release.artistId || 0) || null,
    }));
  }

  async getFeaturedReleases(): Promise<ReleaseWithArtist[]> {
    const releases = Array.from(this.releases.values()).filter(release => release.featured);
    return releases.map(release => ({
      ...release,
      artist: this.artists.get(release.artistId || 0) || null,
    }));
  }

  async getRelease(id: number): Promise<ReleaseWithArtist | undefined> {
    const release = this.releases.get(id);
    if (!release) return undefined;
    
    return {
      ...release,
      artist: this.artists.get(release.artistId || 0) || null,
    };
  }

  async getReleasesByArtist(artistId: number): Promise<ReleaseWithArtist[]> {
    const releases = Array.from(this.releases.values()).filter(release => release.artistId === artistId);
    return releases.map(release => ({
      ...release,
      artist: this.artists.get(release.artistId || 0) || null,
    }));
  }

  async createRelease(insertRelease: InsertRelease): Promise<Release> {
    const id = this.currentReleaseId++;
    const release: Release = { 
      ...insertRelease, 
      id, 
      releaseDate: new Date(),
    };
    this.releases.set(id, release);
    return release;
  }

  async searchReleases(query: string): Promise<ReleaseWithArtist[]> {
    const lowerQuery = query.toLowerCase();
    const releases = Array.from(this.releases.values()).filter(release =>
      release.title.toLowerCase().includes(lowerQuery) ||
      release.genre.toLowerCase().includes(lowerQuery)
    );
    return releases.map(release => ({
      ...release,
      artist: this.artists.get(release.artistId || 0) || null,
    }));
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
  }

  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.news.values()).filter(article => article.featured);
  }

  async getNewsArticle(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const article: News = { 
      ...insertNews, 
      id, 
      publishedAt: new Date(),
    };
    this.news.set(id, article);
    return article;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<(Cart & { release: ReleaseWithArtist })[]> {
    const cartItems = this.cart.get(sessionId) || [];
    const result = [];
    
    for (const item of cartItems) {
      const release = await this.getRelease(item.releaseId || 0);
      if (release) {
        result.push({
          ...item,
          release,
        });
      }
    }
    
    return result;
  }

  async addToCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const cartItem: Cart = { 
      ...insertCart, 
      id, 
      createdAt: new Date(),
    };
    
    const sessionItems = this.cart.get(insertCart.sessionId) || [];
    const existingIndex = sessionItems.findIndex(item => item.releaseId === insertCart.releaseId);
    
    if (existingIndex >= 0) {
      sessionItems[existingIndex].quantity = (sessionItems[existingIndex].quantity || 1) + (insertCart.quantity || 1);
    } else {
      sessionItems.push(cartItem);
    }
    
    this.cart.set(insertCart.sessionId, sessionItems);
    return cartItem;
  }

  async removeFromCart(sessionId: string, releaseId: number): Promise<boolean> {
    const sessionItems = this.cart.get(sessionId) || [];
    const filteredItems = sessionItems.filter(item => item.releaseId !== releaseId);
    this.cart.set(sessionId, filteredItems);
    return true;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    this.cart.delete(sessionId);
    return true;
  }
}

export const storage = new MemStorage();
