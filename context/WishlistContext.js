'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('educompass_wishlist');
      if (stored) {
        // Read browser-only state after hydration to keep server and client markup identical.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading wishlist from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleWishlist = (collegeId, collegeName = '') => {
    setWishlist((prev) => {
      let updated;
      const exists = prev.includes(collegeId);
      if (exists) {
        updated = prev.filter((id) => id !== collegeId);
        showToast(`Removed ${collegeName || 'college'} from your shortlist.`);
      } else {
        updated = [...prev, collegeId];
        showToast(`Saved ${collegeName || 'college'} to your shortlist.`);
      }
      try {
        localStorage.setItem('educompass_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.error('Error writing wishlist:', e);
      }
      return updated;
    });
  };

  const removeFromWishlist = (collegeId, collegeName = '') => {
    setWishlist((prev) => {
      const updated = prev.filter((id) => id !== collegeId);
      try {
        localStorage.setItem('educompass_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.error('Error writing wishlist:', e);
      }
      showToast(`Removed ${collegeName || 'college'} from your shortlist.`);
      return updated;
    });
  };

  const isWishlisted = (collegeId) => wishlist.includes(collegeId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoaded,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        toastMessage,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#14213D] text-white px-4 py-3 rounded-[9px] shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-2 h-2 rounded-full bg-[#4F46E5]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
