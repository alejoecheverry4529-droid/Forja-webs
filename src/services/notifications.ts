/**
 * Web Audio Synthesized Notification Sound & Push Notification API Handler
 */

class NotificationService {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private pushEnabled: boolean = true;

  constructor() {
    // Check stored preferences
    if (typeof window !== 'undefined') {
      const storedSound = localStorage.getItem('forja_sound_enabled');
      if (storedSound !== null) {
        this.soundEnabled = storedSound === 'true';
      }
      const storedPush = localStorage.getItem('forja_push_enabled');
      if (storedPush !== null) {
        this.pushEnabled = storedPush === 'true';
      }
    }
  }

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Play clean synthesized modern futuristic chime for booking notifications
   */
  public playBookingChime() {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // Primary tone
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.22, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.55);

      // Harmonizing high shimmer
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, now + 0.08); // D6
      osc2.frequency.exponentialRampToValueAtTime(1760.00, now + 0.22); // A6

      gain2.gain.setValueAtTime(0.001, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.12, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc2.start(now + 0.08);
      osc2.stop(now + 0.65);
    } catch (e) {
      console.warn('Audio playback not permitted or supported yet:', e);
    }
  }

  /**
   * Request browser push notification permission
   */
  public async requestPushPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    try {
      if (Notification.permission === 'granted') {
        this.pushEnabled = true;
        localStorage.setItem('forja_push_enabled', 'true');
        return true;
      }

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        this.pushEnabled = granted;
        localStorage.setItem('forja_push_enabled', granted ? 'true' : 'false');
        return granted;
      }
    } catch (e) {
      console.warn('Notification permission error:', e);
    }
    return false;
  }

  /**
   * Send browser native push notification
   */
  public sendBrowserNotification(title: string, body: string, icon = '/favicon.ico') {
    if (!this.pushEnabled) return;
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon,
          badge: icon,
          tag: 'forja-notification-' + Date.now()
        });
      } catch (e) {
        console.warn('Could not display system notification:', e);
      }
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(val: boolean) {
    this.soundEnabled = val;
    localStorage.setItem('forja_sound_enabled', val ? 'true' : 'false');
  }

  public isPushEnabled(): boolean {
    return this.pushEnabled;
  }

  public setPushEnabled(val: boolean) {
    this.pushEnabled = val;
    localStorage.setItem('forja_push_enabled', val ? 'true' : 'false');
  }
}

export const notificationService = new NotificationService();
