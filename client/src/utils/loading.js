/**
 * Loading screen and asset management utilities
 * Based on the original Mic Drop Records implementation
 *
 * Now supports a fade-out effect for the loading screen for a more professional look.
 */

export class LoadingManager {
  constructor() {
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.onProgressUpdate = null;
    this.onComplete = null;
    this.fadeDuration = 500; // ms, match with CSS
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
      // Instead of instantly hiding the loader, fade out
      setTimeout(() => {
        this.fadeOutLoader();
      }, 500);
    }
  }

  /**
   * Triggers fade-out effect and calls onComplete after fade
   */
  fadeOutLoader() {
    const loader = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    if (loader) {
      loader.classList.add('hidden'); // triggers CSS fade-out transition

      setTimeout(() => {
        loader.style.display = 'none';
        if (mainContent) {
          mainContent.classList.add('visible'); // fade in main content after loader fades out
        }
        if (this.onComplete) this.onComplete();
      }, this.fadeDuration); // Wait for fade to finish before removing from DOM
    } else {
      // If loader not found, just call onComplete
      if (this.onComplete) this.onComplete();
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

  static hasConsent() {
    return localStorage.getItem(this.CONSENT_KEY) !== null;
  }

  static acceptCookies() {
    localStorage.setItem(this.CONSENT_KEY, 'accepted');
    localStorage.setItem(this.DATE_KEY, new Date().toISOString());
  }

  static declineCookies() {
    localStorage.setItem(this.CONSENT_KEY, 'declined');
    localStorage.setItem(this.DATE_KEY, new Date().toISOString());
  }

  static getConsentStatus() {
    return localStorage.getItem(this.CONSENT_KEY);
  }

  static getConsentDate() {
    const date = localStorage.getItem(this.DATE_KEY);
    return date ? new Date(date) : null;
  }

  static clearConsent() {
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.DATE_KEY);
  }
}

/**
 * Mobile and responsive utilities
 */
export class ResponsiveUtils {
  static isMobile() {
    return window.innerWidth <= 768;
  }

  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isDesktop() {
    return window.innerWidth > 1024;
  }

  static getDeviceType() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }

  static onResize(callback) {
    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 100);
    });
  }

  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
}
