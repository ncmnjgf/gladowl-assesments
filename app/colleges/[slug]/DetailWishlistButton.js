'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function DetailWishlistButton({ collegeId, collegeName }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(collegeId);

  return (
    <button
      onClick={() => toggleWishlist(collegeId, collegeName)}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] text-sm font-medium transition cursor-pointer shadow-xs ${
        wishlisted
          ? 'bg-[#EEF2FF] border border-[#4F46E5] text-[#4F46E5]'
          : 'bg-[#4F46E5] hover:bg-[#4338CA] text-white'
      }`}
    >
      <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#4F46E5] text-[#4F46E5]' : 'text-white'}`} />
      <span>{wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
    </button>
  );
}
