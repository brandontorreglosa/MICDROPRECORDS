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
        name: "Luna Rodriguez",
        bio: "Rising star with ethereal vocals and introspective lyrics that resonate with Gen Z audiences.",
        genre: "Alternative Pop",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        spotifyUrl: "https://spotify.com/artist/luna",
        instagramUrl: "https://instagram.com/lunarodriguez",
        youtubeUrl: "https://youtube.com/lunarodriguez",
        featured: true,
      },
      {
        name: "Echo Valley",
        bio: "Experimental electronic duo pushing boundaries with innovative soundscapes and live visuals.",
        genre: "Electronic",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        featured: true,
      },
      {
        name: "Marcus \"Flow\" Johnson",
        bio: "Street poet turned chart-topper, known for his conscious rap and community activism.",
        genre: "Hip-Hop",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        featured: true,
      },
      {
        name: "Neon Satellites",
        bio: "Four-piece indie rock band blending nostalgic melodies with modern production techniques.",
        genre: "Indie Rock",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        featured: true,
      },
      {
        name: "Sophia Chen",
        bio: "Virtuoso saxophonist bridging traditional jazz with contemporary R&B and neo-soul influences.",
        genre: "Contemporary Jazz",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        featured: true,
      },
      {
        name: "River Stone",
        bio: "Singer-songwriter crafting intimate stories through acoustic melodies and poetic lyricism.",
        genre: "Indie Folk",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        featured: true,
      },
    ];

    artistsData.forEach(artist => {
      this.createArtist(artist);
    });

    // Seed releases
    const releasesData: InsertRelease[] = [
      {
        title: "Neon Nights",
        artistId: 2, // Echo Valley
        genre: "Electronic",
        price: "25.00",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        audioUrl: "https://example.com/audio/neon-nights.mp3",
        description: "A journey through synthetic dreams and electric emotions.",
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
        title: "Digital Horizons",
        artistId: 2, // Echo Valley
        genre: "Electronic",
        price: "27.00",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        featured: true,
      },
      {
        title: "Aurora Dreams",
        artistId: 1, // Luna Rodriguez
        genre: "Alternative Pop",
        price: "23.00",
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
        content: "Echo Valley and Luna Rodriguez team up for an experimental cross-genre album set to release in early 2025.",
        excerpt: "Echo Valley and Luna Rodriguez team up for an experimental cross-genre album set to release in early 2025.",
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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getArtists(): Promise<Artist[]> {
    return await db.select().from(artists).orderBy(desc(artists.createdAt));
  }

  async getFeaturedArtists(): Promise<Artist[]> {
    return await db.select().from(artists).where(eq(artists.featured, true)).orderBy(desc(artists.createdAt));
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist || undefined;
  }

  async createArtist(artist: InsertArtist): Promise<Artist> {
    const [newArtist] = await db
      .insert(artists)
      .values(artist)
      .returning();
    return newArtist;
  }

  async searchArtists(query: string): Promise<Artist[]> {
    return await db.select().from(artists).where(
      or(
        like(artists.name, `%${query}%`),
        like(artists.genre, `%${query}%`)
      )
    );
  }

  async getReleases(): Promise<ReleaseWithArtist[]> {
    return await db
      .select({
        id: releases.id,
        title: releases.title,
        genre: releases.genre,
        image: releases.image,
        featured: releases.featured,
        artistId: releases.artistId,
        price: releases.price,
        audioUrl: releases.audioUrl,
        description: releases.description,
        releaseDate: releases.releaseDate,
        artist: artists
      })
      .from(releases)
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .orderBy(desc(releases.releaseDate));
  }

  async getFeaturedReleases(): Promise<ReleaseWithArtist[]> {
    return await db
      .select({
        id: releases.id,
        title: releases.title,
        genre: releases.genre,
        image: releases.image,
        featured: releases.featured,
        artistId: releases.artistId,
        price: releases.price,
        audioUrl: releases.audioUrl,
        description: releases.description,
        releaseDate: releases.releaseDate,
        artist: artists
      })
      .from(releases)
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .where(eq(releases.featured, true))
      .orderBy(desc(releases.releaseDate));
  }

  async getRelease(id: number): Promise<ReleaseWithArtist | undefined> {
    const [release] = await db
      .select({
        id: releases.id,
        title: releases.title,
        genre: releases.genre,
        image: releases.image,
        featured: releases.featured,
        artistId: releases.artistId,
        price: releases.price,
        audioUrl: releases.audioUrl,
        description: releases.description,
        releaseDate: releases.releaseDate,
        artist: artists
      })
      .from(releases)
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .where(eq(releases.id, id));
    return release || undefined;
  }

  async getReleasesByArtist(artistId: number): Promise<ReleaseWithArtist[]> {
    return await db
      .select({
        id: releases.id,
        title: releases.title,
        genre: releases.genre,
        image: releases.image,
        featured: releases.featured,
        artistId: releases.artistId,
        price: releases.price,
        audioUrl: releases.audioUrl,
        description: releases.description,
        releaseDate: releases.releaseDate,
        artist: artists
      })
      .from(releases)
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .where(eq(releases.artistId, artistId))
      .orderBy(desc(releases.releaseDate));
  }

  async createRelease(release: InsertRelease): Promise<Release> {
    const [newRelease] = await db
      .insert(releases)
      .values(release)
      .returning();
    return newRelease;
  }

  async searchReleases(query: string): Promise<ReleaseWithArtist[]> {
    return await db
      .select({
        id: releases.id,
        title: releases.title,
        genre: releases.genre,
        image: releases.image,
        featured: releases.featured,
        artistId: releases.artistId,
        price: releases.price,
        audioUrl: releases.audioUrl,
        description: releases.description,
        releaseDate: releases.releaseDate,
        artist: artists
      })
      .from(releases)
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .where(
        or(
          like(releases.title, `%${query}%`),
          like(releases.genre, `%${query}%`),
          like(artists.name, `%${query}%`)
        )
      );
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.publishedAt));
  }

  async getFeaturedNews(): Promise<News[]> {
    return await db.select().from(news).where(eq(news.featured, true)).orderBy(desc(news.publishedAt));
  }

  async getNewsArticle(id: number): Promise<News | undefined> {
    const [article] = await db.select().from(news).where(eq(news.id, id));
    return article || undefined;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [newNews] = await db
      .insert(news)
      .values(newsItem)
      .returning();
    return newNews;
  }

  async getCartItems(sessionId: string): Promise<(Cart & { release: ReleaseWithArtist })[]> {
    return await db
      .select({
        id: cart.id,
        sessionId: cart.sessionId,
        releaseId: cart.releaseId,
        quantity: cart.quantity,
        createdAt: cart.createdAt,
        release: {
          id: releases.id,
          title: releases.title,
          genre: releases.genre,
          image: releases.image,
          featured: releases.featured,
          artistId: releases.artistId,
          price: releases.price,
          audioUrl: releases.audioUrl,
          description: releases.description,
          releaseDate: releases.releaseDate,
          artist: artists
        }
      })
      .from(cart)
      .leftJoin(releases, eq(cart.releaseId, releases.id))
      .leftJoin(artists, eq(releases.artistId, artists.id))
      .where(eq(cart.sessionId, sessionId));
  }

  async addToCart(item: InsertCart): Promise<Cart> {
    const [cartItem] = await db
      .insert(cart)
      .values(item)
      .returning();
    return cartItem;
  }

  async removeFromCart(sessionId: string, releaseId: number): Promise<boolean> {
    const result = await db
      .delete(cart)
      .where(eq(cart.sessionId, sessionId).and(eq(cart.releaseId, releaseId)));
    return result.rowCount > 0;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const result = await db
      .delete(cart)
      .where(eq(cart.sessionId, sessionId));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
