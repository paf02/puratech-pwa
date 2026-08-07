import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share } from 'lucide-react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone app
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone;
    setIsStandalone(standalone);

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');

    if (!standalone && !dismissed) {
      // For Android/Chrome
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // For iOS, show after 30 seconds if not standalone
      if (ios) {
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 30000);
        return () => clearTimeout(timer);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowPrompt(false);
      }

      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-4 z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="bg-white/20 p-3 rounded-xl">
          <Smartphone className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Install PuraTech Store</h3>
          <p className="text-sm text-blue-100 mb-3">
            Add to your home screen for a better shopping experience
          </p>

          {isIOS ? (
            // iOS Instructions
            <div className="bg-white/10 rounded-lg p-3 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Tap the <Share className="w-4 h-4 inline" /> Share button</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Scroll and tap "Add to Home Screen"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Tap "Add" to confirm</span>
              </div>
            </div>
          ) : (
            // Android/Chrome Install Button
            <button
              onClick={handleInstall}
              className="w-full bg-white text-blue-600 px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
