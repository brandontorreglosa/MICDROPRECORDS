import type { Artist, ReleaseWithArtist } from "@shared/schema";

export interface UserPreferences {
  favoriteArtists: number[];
  favoriteMusic: number[];
  likedGenres: string[];
  playlistHistory: number[];
  cookieConsent: 'accepted' | 'declined' | null;
  language: string;
  theme: 'light' | 'dark';
  volume: number;
  autoplay: boolean;
  lastVisited: string;
  sessionId: string;
}

export class UserPreferencesManager {
  private static STORAGE_KEY = 'micDropUserPreferences';
  private static SESSION_KEY = 'micDropSession';
  
  private static defaultPreferences: UserPreferences = {
    favoriteArtists: [],
    favoriteMusic: [],
    likedGenres: [],
    playlistHistory: [],
    cookieConsent: null,
    language: 'en',
    theme: 'dark',
    volume: 80,
    autoplay: false,
    lastVisited: new Date().toISOString(),
    sessionId: this.generateSessionId()
  };

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load user preferences from localStorage');
    }
    return { ...this.defaultPreferences };
  }

  static savePreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { 
        ...current, 
        ...preferences,
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save user preferences to localStorage');
    }
  }

  static getSessionId(): string {
    try {
      let sessionId = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionId) {
        sessionId = this.generateSessionId();
        sessionStorage.setItem(this.SESSION_KEY, sessionId);
      }
      return sessionId;
    } catch (error) {
      return this.generateSessionId();
    }
  }

  // Favorite Artists Management
  static addFavoriteArtist(artistId: number): void {
    const prefs = this.getPreferences();
    if (!prefs.favoriteArtists.includes(artistId)) {
      prefs.favoriteArtists.push(artistId);
      this.savePreferences({ favoriteArtists: prefs.favoriteArtists });
    }
  }

  static removeFavoriteArtist(artistId: number): void {
    const prefs = this.getPreferences();
    const updated = prefs.favoriteArtists.filter(id => id !== artistId);
    this.savePreferences({ favoriteArtists: updated });
  }

  static isFavoriteArtist(artistId: number): boolean {
    const prefs = this.getPreferences();
    return prefs.favoriteArtists.includes(artistId);
  }

  // Favorite Music Management
  static addFavoriteMusic(releaseId: number): void {
    const prefs = this.getPreferences();
    if (!prefs.favoriteMusic.includes(releaseId)) {
      prefs.favoriteMusic.push(releaseId);
      this.savePreferences({ favoriteMusic: prefs.favoriteMusic });
    }
  }

  static removeFavoriteMusic(releaseId: number): void {
    const prefs = this.getPreferences();
    const updated = prefs.favoriteMusic.filter(id => id !== releaseId);
    this.savePreferences({ favoriteMusic: updated });
  }

  static isFavoriteMusic(releaseId: number): boolean {
    const prefs = this.getPreferences();
    return prefs.favoriteMusic.includes(releaseId);
  }

  // Genre Preferences
  static addLikedGenre(genre: string): void {
    const prefs = this.getPreferences();
    if (!prefs.likedGenres.includes(genre)) {
      prefs.likedGenres.push(genre);
      this.savePreferences({ likedGenres: prefs.likedGenres });
    }
  }

  static removeLikedGenre(genre: string): void {
    const prefs = this.getPreferences();
    const updated = prefs.likedGenres.filter(g => g !== genre);
    this.savePreferences({ likedGenres: updated });
  }

  static isLikedGenre(genre: string): boolean {
    const prefs = this.getPreferences();
    return prefs.likedGenres.includes(genre);
  }

  // Playlist History
  static addToPlaylistHistory(releaseId: number): void {
    const prefs = this.getPreferences();
    // Remove if already exists and add to beginning
    const filtered = prefs.playlistHistory.filter(id => id !== releaseId);
    const updated = [releaseId, ...filtered].slice(0, 50); // Keep last 50 items
    this.savePreferences({ playlistHistory: updated });
  }

  static getPlaylistHistory(): number[] {
    const prefs = this.getPreferences();
    return prefs.playlistHistory;
  }

  static clearPlaylistHistory(): void {
    this.savePreferences({ playlistHistory: [] });
  }

  // Cookie Consent
  static setCookieConsent(consent: 'accepted' | 'declined'): void {
    this.savePreferences({ cookieConsent: consent });
  }

  static getCookieConsent(): 'accepted' | 'declined' | null {
    const prefs = this.getPreferences();
    return prefs.cookieConsent;
  }

  static hasCookieConsent(): boolean {
    return this.getCookieConsent() !== null;
  }

  // Language Settings
  static setLanguage(language: string): void {
    this.savePreferences({ language });
  }

  static getLanguage(): string {
    const prefs = this.getPreferences();
    return prefs.language;
  }

  // Theme Settings
  static setTheme(theme: 'light' | 'dark'): void {
    this.savePreferences({ theme });
  }

  static getTheme(): 'light' | 'dark' {
    const prefs = this.getPreferences();
    return prefs.theme;
  }

  // Audio Settings
  static setVolume(volume: number): void {
    this.savePreferences({ volume: Math.max(0, Math.min(100, volume)) });
  }

  static getVolume(): number {
    const prefs = this.getPreferences();
    return prefs.volume;
  }

  static setAutoplay(autoplay: boolean): void {
    this.savePreferences({ autoplay });
  }

  static getAutoplay(): boolean {
    const prefs = this.getPreferences();
    return prefs.autoplay;
  }

  // Analytics and Insights
  static getRecommendedGenres(): string[] {
    const prefs = this.getPreferences();
    return prefs.likedGenres.slice(0, 5); // Top 5 liked genres
  }

  static getUserActivity(): {
    totalFavoriteArtists: number;
    totalFavoriteMusic: number;
    totalGenresLiked: number;
    playlistHistoryCount: number;
    lastVisited: string;
  } {
    const prefs = this.getPreferences();
    return {
      totalFavoriteArtists: prefs.favoriteArtists.length,
      totalFavoriteMusic: prefs.favoriteMusic.length,
      totalGenresLiked: prefs.likedGenres.length,
      playlistHistoryCount: prefs.playlistHistory.length,
      lastVisited: prefs.lastVisited
    };
  }

  // Data Export/Import
  static exportUserData(): string {
    const prefs = this.getPreferences();
    return JSON.stringify(prefs, null, 2);
  }

  static importUserData(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      this.savePreferences(parsed);
      return true;
    } catch (error) {
      console.error('Failed to import user data:', error);
      return false;
    }
  }

  // Clear All Data
  static clearAllData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.warn('Failed to clear user data');
    }
  }

  // Privacy Compliance
  static getDataForPrivacyExport(): UserPreferences {
    return this.getPreferences();
  }

  static anonymizeUserData(): void {
    const prefs = this.getPreferences();
    this.savePreferences({
      ...prefs,
      sessionId: this.generateSessionId(),
      lastVisited: new Date().toISOString()
    });
  }
}