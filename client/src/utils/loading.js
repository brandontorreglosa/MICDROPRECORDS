/**
 * Loading screen and asset management utilities
 * Based on the original Mic Drop Records implementation
 */

export class LoadingManager {
  constructor() {
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.onProgressUpdate = null;
    this.onComplete = null;
  }

  /**
   * Initialize asset tracking and loading
   */
  initializeTracking() {
    // Track images
    const images = document.querySelectorAll('img');
    this.totalAssets = images.length + 1; // +1 for fonts
    
    images.forEach(img => {
      if (img.complete) {
        this.updateProgress();
      } else {
        img.addEventListener('load', () => this.updateProgress());
        img.addEventListener('error', () => this.updateProgress());
      }
    });

    // Track fonts
    if (document.fonts) {
      document.fonts.ready.then(() => this.updateProgress());
    } else {
      // Fallback for older browsers
      setTimeout(() => this.updateProgress(), 100);
    }
  }

  /**
   * Update loading progress
   */
  updateProgress() {
    this.loadedAssets++;
    const progress = Math.min((this.loadedAssets / this.totalAssets) * 100, 100);
    
    if (this.onProgressUpdate) {
      this.onProgressUpdate(progress, this.loadedAssets, this.totalAssets);
    }

    if (progress >= 100 && this.onComplete) {
      setTimeout(() => this.onComplete(), 500);
    }
  }

  /**
   * Set progress callback
   */
  setProgressCallback(callback) {
    this.onProgressUpdate = callback;
  }

  /**
   * Set completion callback
   */
  setCompleteCallback(callback) {
    this.onComplete = callback;
  }
}

/**
 * Cookie management utilities
 */
export class CookieManager {
  static CONSENT_KEY = 'micDropCookieConsent';
  static DATE_KEY = 'micDropCookieDate';

  /**
   * Check if user has given consent
   */
  static hasConsent() {
    return localStorage.getItem(this.CONSENT_KEY) !== null;
  }

  /**
   * Accept cookies
   */
  static acceptCookies() {
    localStorage.setItem(this.CONSENT_KEY, 'accepted');
    localStorage.setItem(this.DATE_KEY, new Date().toISOString());
  }

  /**
   * Decline cookies
   */
  static declineCookies() {
    localStorage.setItem(this.CONSENT_KEY, 'declined');
    localStorage.setItem(this.DATE_KEY, new Date().toISOString());
  }

  /**
   * Get consent status
   */
  static getConsentStatus() {
    return localStorage.getItem(this.CONSENT_KEY);
  }

  /**
   * Get consent date
   */
  static getConsentDate() {
    const date = localStorage.getItem(this.DATE_KEY);
    return date ? new Date(date) : null;
  }

  /**
   * Clear consent (for testing)
   */
  static clearConsent() {
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.DATE_KEY);
  }
}

/**
 * Mobile and responsive utilities
 */
export class ResponsiveUtils {
  /**
   * Check if device is mobile
   */
  static isMobile() {
    return window.innerWidth <= 768;
  }

  /**
   * Check if device is tablet
   */
  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  /**
   * Check if device is desktop
   */
  static isDesktop() {
    return window.innerWidth > 1024;
  }

  /**
   * Get device type
   */
  static getDeviceType() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }

  /**
   * Add resize listener
   */
  static onResize(callback) {
    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 100);
    });
  }

  /**
   * Touch device detection
   */
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
}