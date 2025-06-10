export class LoadingManager {
  constructor() {
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.onProgressUpdate = null;
    this.onComplete = null;
    this.fadeDuration = 800; // ms, matches CSS transition
  }

  /**
   * Initializes tracking for images and fonts.
   */
  initializeTracking() {
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
      setTimeout(() => this.updateProgress(), 100);
    }
  }

  /**
   * Updates the progress bar and triggers completion if done.
   */
  updateProgress() {
    this.loadedAssets++;
    const progress = Math.min((this.loadedAssets / this.totalAssets) * 100, 100);

    if (this.onProgressUpdate) {
      this.onProgressUpdate(progress, this.loadedAssets, this.totalAssets);
    }

    if (progress >= 100 && this.onComplete) {
      setTimeout(() => this.fadeOutLoader(), 500);
    }
  }

  /**
   * Fades out the loading screen and then completes.
   */
  fadeOutLoader() {
    const loader = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    if (loader) {
      loader.classList.add('hidden'); // triggers CSS fade-out
      setTimeout(() => {
        loader.style.display = 'none';
        if (mainContent) {
          mainContent.classList.add('visible');
        }
        if (this.onComplete) this.onComplete();
      }, this.fadeDuration);
    } else {
      if (this.onComplete) this.onComplete();
    }
  }

  /**
   * Set a callback for progress updates.
   */
  setProgressCallback(callback) {
    this.onProgressUpdate = callback;
  }

  /**
   * Set a callback for completion.
   */
  setCompleteCallback(callback) {
    this.onComplete = callback;
  }
}
